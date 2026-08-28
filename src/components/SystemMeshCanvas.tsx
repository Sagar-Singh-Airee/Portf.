import React, { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  id: number;
  cluster: number;
  pulsePhase: number;
  highlighted: boolean;
}

interface Packet {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

interface SystemMeshCanvasProps {
  interactive?: boolean;
  density?: 'low' | 'normal' | 'high';
  className?: string;
}

export const SystemMeshCanvas: React.FC<SystemMeshCanvasProps> = ({
  interactive = true,
  density = 'normal',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const [activePacketsCount, setActivePacketsCount] = useState(12);
  const [nodeCountState, setNodeCountState] = useState(38);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Initialize Nodes
    const targetNodeCount = density === 'low' ? 22 : density === 'high' ? 52 : 36;
    setNodeCountState(targetNodeCount);

    const nodes: Node[] = [];
    const clusters = 4;

    for (let i = 0; i < targetNodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2.2 + 2,
        id: i,
        cluster: i % clusters,
        pulsePhase: Math.random() * Math.PI * 2,
        highlighted: false,
      });
    }

    // Packet Simulation
    let packets: Packet[] = [];
    const maxPackets = 18;

    const spawnPacket = () => {
      if (nodes.length < 2) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      // Find a nearby node
      const from = nodes[fromIdx];
      let nearestDist = 200;
      let toIdx = -1;

      for (let j = 0; j < nodes.length; j++) {
        if (j === fromIdx) continue;
        const to = nodes[j];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 160 && dist < nearestDist) {
          nearestDist = dist;
          toIdx = j;
        }
      }

      if (toIdx !== -1) {
        packets.push({
          fromNode: fromIdx,
          toNode: toIdx,
          progress: 0,
          speed: 0.015 + Math.random() * 0.015,
          color: Math.random() > 0.3 ? '#FFB52E' : '#050505',
        });
      }
    };

    // Pre-populate packets
    for (let p = 0; p < 8; p++) {
      spawnPacket();
    }

    let lastPacketSpawn = 0;

    // Animation Loop
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // Spawn periodic packet
      if (time - lastPacketSpawn > 320 && packets.length < maxPackets) {
        spawnPacket();
        lastPacketSpawn = time;
        setActivePacketsCount(packets.length);
      }

      const mouse = mouseRef.current;
      const connectionDist = 135;

      // Update and draw connections
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];

        // Move nodes
        nodeA.x += nodeA.vx;
        nodeA.y += nodeA.vy;

        // Bounce off canvas boundaries with damping
        if (nodeA.x < 10) {
          nodeA.x = 10;
          nodeA.vx *= -1;
        } else if (nodeA.x > width - 10) {
          nodeA.x = width - 10;
          nodeA.vx *= -1;
        }
        if (nodeA.y < 10) {
          nodeA.y = 10;
          nodeA.vy *= -1;
        } else if (nodeA.y > height - 10) {
          nodeA.y = height - 10;
          nodeA.vy *= -1;
        }

        // Mouse interaction: slight gravitational or gentle repulsion
        if (interactive && mouse.active) {
          const dxMouse = mouse.x - nodeA.x;
          const dyMouse = mouse.y - nodeA.y;
          const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

          if (distMouse < 140 && distMouse > 5) {
            const force = (140 - distMouse) / 140;
            nodeA.x -= (dxMouse / distMouse) * force * 1.5;
            nodeA.y -= (dyMouse / distMouse) * force * 1.5;
            nodeA.highlighted = true;
          } else {
            nodeA.highlighted = false;
          }
        }

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.22;
            const isHighlighted = nodeA.highlighted || nodeB.highlighted;

            ctx.strokeStyle = isHighlighted
              ? `rgba(255, 181, 46, ${alpha * 2.5})`
              : `rgba(5, 5, 5, ${alpha * 0.9})`;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Draw Packets moving between nodes
      for (let p = packets.length - 1; p >= 0; p--) {
        const pkt = packets[p];
        pkt.progress += pkt.speed;

        const from = nodes[pkt.fromNode];
        const to = nodes[pkt.toNode];

        if (!from || !to || pkt.progress >= 1) {
          packets.splice(p, 1);
          continue;
        }

        const currX = from.x + (to.x - from.x) * pkt.progress;
        const currY = from.y + (to.y - from.y) * pkt.progress;

        // Draw Packet
        ctx.fillStyle = pkt.color;
        ctx.shadowColor = '#FFB52E';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(currX, currY, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.pulsePhase += 0.035;
        const pulse = Math.sin(node.pulsePhase) * 0.5 + 0.5;

        // Outer glow on pulse
        if (node.highlighted || i % 4 === 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 3 + pulse * 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 181, 46, 0.18)';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.highlighted
          ? '#FFB52E'
          : i % 4 === 0
          ? '#FFB52E'
          : 'rgba(5, 5, 5, 0.75)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const onMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      window.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseleave', onMouseLeave);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      if (interactive) {
        window.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, [interactive, density]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block opacity-70" />
      {/* Precision system watermark */}
      <div className="absolute bottom-4 left-6 hidden md:flex items-center gap-2 text-[10px] font-mono text-[#050505]/40 select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FFB52E] animate-pulse" />
        <span>TOPOLOGY: {nodeCountState} ACTIVE MESH NODES</span>
        <span>·</span>
        <span>ROUTING: {activePacketsCount} PKT/S</span>
      </div>
    </div>
  );
};
