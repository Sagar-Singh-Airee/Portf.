import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Server,
  Zap,
  Activity,
  Play,
  RotateCcw,
  ShieldAlert,
  CheckCircle2,
  Terminal,
  Cpu,
} from 'lucide-react';

interface ClusterNode {
  id: number;
  name: string;
  role: 'LEADER' | 'FOLLOWER' | 'CANDIDATE' | 'OFFLINE';
  term: number;
  votes: number;
  logCount: number;
  latencyMs: number;
  x: number;
  y: number;
}

export const ConsensusSimulator: React.FC = () => {
  const [term, setTerm] = useState<number>(14);
  const [commitIndex, setCommitIndex] = useState<number>(184290);
  const [isSimulatingLoad, setIsSimulatingLoad] = useState<boolean>(false);
  const [partitionedNodeId, setPartitionedNodeId] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([
    '[INIT] Raft cluster bootstrap: 5 replicas active',
    '[RAFT] Node 01 heartbeat ack from 4 followers (quorum 5/5)',
    '[COMMIT] Index 184290 committed across cluster in 1.4ms',
  ]);

  const [nodes, setNodes] = useState<ClusterNode[]>([
    { id: 1, name: 'raft-node-01', role: 'LEADER', term: 14, votes: 5, logCount: 184290, latencyMs: 1.2, x: 50, y: 15 },
    { id: 2, name: 'raft-node-02', role: 'FOLLOWER', term: 14, votes: 0, logCount: 184290, latencyMs: 1.8, x: 85, y: 45 },
    { id: 3, name: 'raft-node-03', role: 'FOLLOWER', term: 14, votes: 0, logCount: 184290, latencyMs: 2.1, x: 72, y: 88 },
    { id: 4, name: 'raft-node-04', role: 'FOLLOWER', term: 14, votes: 0, logCount: 184290, latencyMs: 1.9, x: 28, y: 88 },
    { id: 5, name: 'raft-node-05', role: 'FOLLOWER', term: 14, votes: 0, logCount: 184290, latencyMs: 2.4, x: 15, y: 45 },
  ]);

  const [pulseBeams, setPulseBeams] = useState<{ id: string; from: number; to: number; color: string }[]>([]);

  // Heartbeat animation loop
  useEffect(() => {
    const leader = nodes.find((n) => n.role === 'LEADER');
    if (!leader) return;

    const interval = setInterval(() => {
      // Send heartbeats from leader to all online followers
      const newBeams = nodes
        .filter((n) => n.id !== leader.id && n.role !== 'OFFLINE')
        .map((f) => ({
          id: `${Date.now()}-${f.id}`,
          from: leader.id,
          to: f.id,
          color: '#FFB52E',
        }));

      setPulseBeams(newBeams);

      setTimeout(() => {
        setPulseBeams([]);
      }, 700);
    }, 1800);

    return () => clearInterval(interval);
  }, [nodes]);

  // Action 1: Trigger Election
  const triggerElection = () => {
    const currentLeader = nodes.find((n) => n.role === 'LEADER');
    const eligibleFollowers = nodes.filter((n) => n.role !== 'OFFLINE' && n.id !== currentLeader?.id);
    if (eligibleFollowers.length === 0) return;

    const newLeaderCandidate = eligibleFollowers[Math.floor(Math.random() * eligibleFollowers.length)];
    const newTerm = term + 1;
    setTerm(newTerm);

    // Set candidate state
    setNodes((prev) =>
      prev.map((node) => {
        if (node.id === newLeaderCandidate.id) {
          return { ...node, role: 'CANDIDATE', term: newTerm, votes: 1 };
        }
        return { ...node, role: 'FOLLOWER', term: newTerm };
      })
    );

    setLogs((prev) => [
      `[TERM ${newTerm}] Node ${currentLeader?.id || 1} stepdown. Election triggered by ${newLeaderCandidate.name}`,
      ...prev.slice(0, 4),
    ]);

    // Vote tally simulation
    setTimeout(() => {
      setNodes((prev) =>
        prev.map((node) => {
          if (node.id === newLeaderCandidate.id) {
            return { ...node, role: 'LEADER', votes: 4 };
          }
          return node;
        })
      );
      setLogs((prev) => [
        `[LEADER ELECTED] ${newLeaderCandidate.name} won quorum (4/5 votes). Heartbeats renewed.`,
        ...prev.slice(0, 4),
      ]);
    }, 600);
  };

  // Action 2: Send 50,000 Ops Load
  const simulateLoadBurst = () => {
    if (isSimulatingLoad) return;
    setIsSimulatingLoad(true);

    const opsToAdd = 50000;
    const nextCommit = commitIndex + opsToAdd;
    setCommitIndex(nextCommit);

    const leader = nodes.find((n) => n.role === 'LEADER');

    setLogs((prev) => [
      `[BATCH] +${opsToAdd.toLocaleString()} ops ingested into leader queue. Log compaction active.`,
      ...prev.slice(0, 4),
    ]);

    // Emit bursts of packets
    if (leader) {
      const bursts = nodes
        .filter((n) => n.id !== leader.id && n.role !== 'OFFLINE')
        .map((f) => ({
          id: `burst-${Date.now()}-${f.id}`,
          from: leader.id,
          to: f.id,
          color: '#F8F7F3',
        }));
      setPulseBeams(bursts);
    }

    setTimeout(() => {
      setNodes((prev) =>
        prev.map((n) => (n.role !== 'OFFLINE' ? { ...n, logCount: nextCommit } : n))
      );
      setLogs((prev) => [
        `[REPLICATED] Quorum commit achieved: p99 latency 1.74ms at 1.48M ops/sec.`,
        ...prev.slice(0, 4),
      ]);
      setIsSimulatingLoad(false);
      setPulseBeams([]);
    }, 800);
  };

  // Action 3: Simulate Partition
  const togglePartition = () => {
    if (partitionedNodeId !== null) {
      // Recover partitioned node
      const recoveredId = partitionedNodeId;
      setPartitionedNodeId(null);
      setNodes((prev) =>
        prev.map((n) =>
          n.id === recoveredId
            ? { ...n, role: 'FOLLOWER', logCount: commitIndex, latencyMs: 2.0 }
            : n
        )
      );
      setLogs((prev) => [
        `[RECOVER] Node 0${recoveredId} network link restored. Catchup sync completed via fast-forward snapshots.`,
        ...prev.slice(0, 4),
      ]);
    } else {
      // Partition node 5
      const targetNode = 5;
      setPartitionedNodeId(targetNode);
      setNodes((prev) =>
        prev.map((n) =>
          n.id === targetNode ? { ...n, role: 'OFFLINE', latencyMs: 999 } : n
        )
      );
      setLogs((prev) => [
        `[PARTITION] Node 0${targetNode} isolated by simulated network split. Cluster remains healthy (4/5 quorum intact).`,
        ...prev.slice(0, 4),
      ]);
    }
  };

  return (
    <div className="w-full bg-[#050505] rounded-3xl border border-white/15 p-5 sm:p-7 text-white shadow-2xl relative overflow-hidden">
      {/* Background Subtle Coordinate Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* Top Header & Telemetry Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFB52E] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#FFB52E] uppercase font-bold">
              INTERACTIVE CONSENSUS TOPOLOGY · RAFT ENGINE
            </span>
          </div>
          <p className="text-xs text-white/60 font-mono">
            Deterministic state machine replication running 5 virtual nodes with zero-allocation rings.
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
            <span className="text-white/40">TERM:</span>
            <span className="text-[#FFB52E] font-bold">{term}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
            <span className="text-white/40">COMMIT:</span>
            <span className="text-white font-bold">{commitIndex.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Center Visualization Canvas */}
      <div className="relative z-10 my-6 aspect-[16/10] sm:aspect-[16/9] w-full max-h-[360px] rounded-2xl bg-white/[0.02] border border-white/10 relative flex items-center justify-center overflow-hidden">
        {/* Symmetrical Orbit Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[75%] aspect-square rounded-full border border-white/[0.08] border-dashed animate-spin-very-slow" />
          <div className="w-[50%] aspect-square rounded-full border border-white/[0.05]" />
        </div>

        {/* Center Hub Indicator */}
        <div className="absolute z-10 flex flex-col items-center pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-[#FFB52E]/10 border border-[#FFB52E]/30 flex items-center justify-center shadow-[0_0_25px_rgba(255,181,46,0.25)]">
            <Cpu className="w-5 h-5 text-[#FFB52E] animate-pulse" />
          </div>
          <span className="text-[10px] font-mono text-white/50 mt-1 uppercase tracking-wider">
            QUORUM 5/5
          </span>
        </div>

        {/* Dynamic Heartbeat & Packet Beams SVG Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-15">
          {/* Static Mesh Lines between all nodes */}
          {nodes.map((nodeA, i) =>
            nodes.slice(i + 1).map((nodeB) => (
              <line
                key={`line-${nodeA.id}-${nodeB.id}`}
                x1={`${nodeA.x}%`}
                y1={`${nodeA.y}%`}
                x2={`${nodeB.x}%`}
                y2={`${nodeB.y}%`}
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            ))
          )}

          {/* Active Animated Beams */}
          {pulseBeams.map((beam) => {
            const fromNode = nodes.find((n) => n.id === beam.from);
            const toNode = nodes.find((n) => n.id === beam.to);
            if (!fromNode || !toNode) return null;

            return (
              <line
                key={beam.id}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y}%`}
                stroke={beam.color}
                strokeWidth="2.5"
                strokeLinecap="round"
                className="animate-pulse"
                style={{ filter: 'drop-shadow(0 0 6px #FFB52E)' }}
              />
            );
          })}
        </svg>

        {/* Nodes Placed in Geometry */}
        {nodes.map((node) => {
          const isLeader = node.role === 'LEADER';
          const isOffline = node.role === 'OFFLINE';

          return (
            <motion.div
              key={node.id}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              whileHover={{ scale: 1.15 }}
            >
              {/* Node Icon Circle */}
              <div
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-md ${
                  isLeader
                    ? 'bg-[#FFB52E] border-white text-[#050505] shadow-[0_0_25px_rgba(255,181,46,0.6)]'
                    : isOffline
                    ? 'bg-red-950/80 border-red-500 text-red-300'
                    : 'bg-[#111] border-white/40 text-white hover:border-[#FFB52E]'
                }`}
              >
                <Server className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>

              {/* Node Role Badge */}
              <div className="mt-1.5 text-center">
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider block ${
                    isLeader
                      ? 'bg-[#FFB52E] text-[#050505]'
                      : isOffline
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : 'bg-white/10 text-white/80'
                  }`}
                >
                  {node.role}
                </span>
                <span className="text-[10px] font-mono text-white/60 block mt-0.5">
                  {node.name}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Controls & Command Toolbar */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        <button
          onClick={triggerElection}
          id="btn-consensus-elect"
          className="px-4 py-3 rounded-xl bg-white/10 hover:bg-[#FFB52E] hover:text-[#050505] border border-white/15 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
        >
          <RotateCcw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
          <span>Elect New Leader</span>
        </button>

        <button
          onClick={simulateLoadBurst}
          disabled={isSimulatingLoad}
          id="btn-consensus-load"
          className="px-4 py-3 rounded-xl bg-[#FFB52E] text-[#050505] hover:bg-white border border-[#FFB52E] text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{isSimulatingLoad ? 'Streaming Batch...' : 'Send 50k Concurrent Ops'}</span>
        </button>

        <button
          onClick={togglePartition}
          id="btn-consensus-partition"
          className={`px-4 py-3 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
            partitionedNodeId !== null
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 hover:bg-emerald-500 hover:text-[#050505]'
              : 'bg-white/10 hover:bg-red-500/20 hover:border-red-500 hover:text-red-300 border-white/15 text-white/90'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>{partitionedNodeId !== null ? 'Heal Network Partition' : 'Simulate Node Partition'}</span>
        </button>
      </div>

      {/* Real-Time Telemetry Stream Log */}
      <div className="relative z-10 mt-4 p-3 bg-black/70 rounded-xl border border-white/10 font-mono text-[11px] text-white/75 space-y-1">
        <div className="flex items-center justify-between text-white/40 pb-1 border-b border-white/10 text-[10px]">
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[#FFB52E]" />
            LIVE RAFT KERNEL LOGS
          </span>
          <span className="text-[#FFB52E]">● ACTIVE PIPELINE</span>
        </div>
        {logs.map((log, idx) => (
          <div key={idx} className="truncate flex items-center gap-2">
            <span className="text-[#FFB52E] select-none">&gt;</span>
            <span className={idx === 0 ? 'text-white font-medium' : 'text-white/60'}>
              {log}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
