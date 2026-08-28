import { Project, Exhibition, StatItem } from '../types';

import heroImg from '../assets/images/developer_hero_1787909280337.jpg';
import aboutImg from '../assets/images/developer_about_1787909294370.jpg';
import datacenterImg from '../assets/images/datacenter_minimal_1787909307707.jpg';
import treeImg from '../assets/images/minimalist_tree_silhouette_1787888276756.jpg';
import archImg from '../assets/images/curved_white_architecture_1787888300727.jpg';
import ferrisImg from '../assets/images/ferris_wheel_minimal_1787888325854.jpg';
import palmImg from '../assets/images/golden_palm_minimal_1787888251134.jpg';

export const HERO_ASSETS = {
  heroCreator: heroImg,
  aboutMonochrome: aboutImg,
  datacenter: datacenterImg,
  goldenPalm: palmImg,
  signature: 'Sagar Singh',
};

export const HERO_STATS: StatItem[] = [
  {
    value: '+2.4M',
    label: 'Peak Req / Sec',
    description: 'Distributed stream throughput with sub-5ms p99 latency across edge clusters',
  },
  {
    value: '99.99%',
    label: 'Production SLA',
    description: 'Zero-downtime multi-region failover and autonomous Kubernetes orchestration',
  },
  {
    value: '45+',
    label: 'Open Source Crates',
    description: 'High-performance Rust, Go & TypeScript libraries adopted by 120k+ developers',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'aether-stream',
    number: '01',
    title: 'Aether Stream',
    subtitle: 'High-Throughput Distributed Raft Consensus Engine',
    year: '2026',
    category: 'Distributed',
    client: 'FinTech Infrastructure & Open Source Foundation',
    location: 'Bangalore & Zurich',
    description:
      'A low-latency distributed event streaming engine written in pure Rust. Implements an optimized pipelined Raft consensus algorithm that sustains 2.4 million events per second with zero garbage collection pauses and predictable memory allocation.',
    concept:
      'Eliminating memory fragmentation by replacing conventional lock-based concurrency with custom lock-free ring buffers and Linux io_uring asynchronous system calls.',
    outcome:
      'Adopted by high-frequency trading platforms; reduced p99 ingestion latency from 42ms down to 1.8ms while cutting cluster compute costs by 64%.',
    tools: ['Rust', 'io_uring', 'gRPC', 'Apache Kafka', 'Prometheus', 'eBPF'],
    image: datacenterImg,
    aspect: 'aspect-[4/5]',
    tags: ['Distributed', 'Rust', 'Consensus', 'Low-Latency'],
    github: 'https://github.com',
    metrics: [
      { label: 'THROUGHPUT', val: '2.4M ops/sec' },
      { label: 'P99 LATENCY', val: '< 1.8ms' },
      { label: 'MEM FOOTPRINT', val: '48MB idle' },
      { label: 'TEST COVERAGE', val: '98.4%' },
    ],
    gallery: [
      datacenterImg,
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'vertex-canvas',
    number: '02',
    title: 'Vertex Canvas',
    subtitle: 'Real-Time Conflict-Free Collaborative State Engine',
    year: '2025',
    category: 'Full-Stack',
    client: 'Design Systems Consortium & Creative Cloud',
    location: 'San Francisco, USA',
    description:
      'A deterministic collaborative canvas architecture powered by Conflict-Free Replicated Data Types (CRDTs) and WebAssembly. Enables thousands of simultaneous cursor manipulations with peer-to-peer WebRTC mesh routing and zero-latency local optimistic updates.',
    concept:
      'Separating state synchronization mathematics from DOM rendering via an offscreen WebWorker vector pipeline and WebGL hardware acceleration.',
    outcome:
      'Open-sourced with 14,000+ GitHub stars; featured as standard foundation for enterprise design collaboration suites.',
    tools: ['TypeScript', 'Rust / WASM', 'WebRTC', 'WebSockets', 'WebGL', 'CRDTs (Yjs)'],
    image: archImg,
    aspect: 'aspect-[3/4]',
    tags: ['Full-Stack', 'CRDTs', 'WASM', 'Real-Time'],
    github: 'https://github.com',
    metrics: [
      { label: 'CONCURRENT PEERS', val: '10,000+' },
      { label: 'DELTA SYNC', val: '8ms' },
      { label: 'FPS BENCHMARK', val: '120 FPS' },
      { label: 'BUNDLE SIZE', val: '28KB gzipped' },
    ],
    gallery: [
      archImg,
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'hyperion-mesh',
    number: '03',
    title: 'Hyperion Mesh',
    subtitle: 'Autonomous Kubernetes Service Mesh with eBPF Routing',
    year: '2026',
    category: 'Infrastructure',
    client: 'Cloud Native Computing Foundation & Enterprise Telemetry',
    location: 'Berlin, Germany',
    description:
      'An intelligent microservice orchestration platform utilizing extended Berkeley Packet Filters (eBPF) to intercept Linux kernel socket traffic directly. Eliminates sidecar container proxy overhead while providing zero-overhead mTLS and automated circuit breaking.',
    concept:
      'Bypassing traditional TCP/IP network stack bottlenecks at the Linux kernel layer to achieve transparent kernel-level packet inspection and cryptographic enforcement.',
    outcome:
      'Reduced cross-service network latency by 78% across 1,800 Kubernetes nodes while automatically preventing cascading retry storms.',
    tools: ['Go', 'eBPF', 'Cilium', 'Kubernetes', 'Envoy', 'Helm', 'Terraform'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-[4/5]',
    tags: ['Infrastructure', 'eBPF', 'Kubernetes', 'Go'],
    github: 'https://github.com',
    metrics: [
      { label: 'NODES MANAGED', val: '1,800+' },
      { label: 'PROXY OVERHEAD', val: '0.04ms' },
      { label: 'CPU REDUCTION', val: '-42%' },
      { label: 'ZERO RETRY STORMS', val: '100%' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
      datacenterImg,
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'neural-matrix',
    number: '04',
    title: 'Neural Matrix',
    subtitle: 'Local-First On-Device LLM Inference & WebGPU Shaders',
    year: '2025',
    category: 'Open Source',
    client: 'AI Research Laboratory & Edge Computing Labs',
    location: 'London, United Kingdom',
    description:
      'A browser-native transformer execution runtime optimized for consumer hardware. Utilizes WebGPU compute shaders and 4-bit INT4 quantization to run 7B-parameter foundational models locally at 38 tokens per second without transmitting confidential telemetry.',
    concept:
      'Preserving data sovereignty and absolute privacy by executing machine intelligence strictly in client sandboxes with zero cloud roundtrips.',
    outcome:
      'Downloaded over 450,000 times; deployed in healthcare and confidential legal environments requiring HIPAA compliance and air-gapped isolation.',
    tools: ['WebGPU', 'Rust', 'WASM', 'WGSL Shaders', 'Quantization (AWQ)', 'TypeScript'],
    image: ferrisImg,
    aspect: 'aspect-[1/1]',
    tags: ['Open Source', 'WebGPU', 'AI Runtime', 'WASM'],
    github: 'https://github.com',
    metrics: [
      { label: 'INFERENCE SPEED', val: '38 tok/sec' },
      { label: 'QUANTIZATION', val: 'INT4 AWQ' },
      { label: 'DATA TRANSFERRED', val: '0 bytes (Local)' },
      { label: 'DOWNLOADS', val: '450k+' },
    ],
    gallery: [
      ferrisImg,
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'chronos-db',
    number: '05',
    title: 'Chronos DB',
    subtitle: 'Embedded Log-Structured Time-Series Storage Engine',
    year: '2026',
    category: 'Distributed',
    client: 'Industrial IoT Analytics & Sensor Networks',
    location: 'Tokyo, Japan',
    description:
      'An embedded append-only LSM-tree storage engine designed for ultra-dense sensor telemetry. Features SIMD-accelerated delta-of-delta timestamp compression and memory-mapped columnar chunks that fit 1 billion datapoints in less than 850MB.',
    concept:
      'Mechanical sympathy with modern CPU cache architectures: laying out data in memory-aligned blocks to prevent cache line misses during heavy query filtration.',
    outcome:
      'Outperformed SQLite and DuckDB by 4.2x in write ingestion benchmarks; integrated into automotive telematics and aerospace monitoring units.',
    tools: ['Rust', 'LSM-Tree', 'SIMD AVX-512', 'Memory Mapped I/O', 'Cap’n Proto'],
    image: treeImg,
    aspect: 'aspect-[3/4]',
    tags: ['Distributed', 'Database', 'SIMD', 'Rust'],
    github: 'https://github.com',
    metrics: [
      { label: 'WRITE INGESTION', val: '8.4M pts/sec' },
      { label: 'COMPRESSION RATIO', val: '14.2x' },
      { label: 'QUERY SPEED', val: '0.6ms range' },
      { label: 'CRASH-SAFE', val: 'ACID WAL' },
    ],
    gallery: [
      treeImg,
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'amber-protocol',
    number: '06',
    title: 'Amber Cryptographic Protocol',
    subtitle: 'Zero-Knowledge Tamper-Evident Audit State Machine',
    year: '2026',
    category: 'Open Source',
    client: 'Decentralized Identity & Trust Verification Collective',
    location: 'Bangalore, India',
    description:
      'A verifiable computing framework that creates zero-knowledge proofs for arbitrary state mutations. Allows enterprise entities to verify compliance with privacy constraints without disclosing underlying sensitive transactional payloads.',
    concept:
      'Combining polynomial commitment schemes with succinct non-interactive arguments (zk-SNARKs) to produce micro-proofs verifiable in under 2ms.',
    outcome:
      'Published at IEEE Symposium on Security and Privacy; trusted by sovereign identity pilots and financial auditing consortiums.',
    tools: ['Rust', 'Halo2', 'zk-SNARKs', 'WebCrypto', 'TypeScript SDK', 'Solidity'],
    image: palmImg,
    accentBg: '#FFB52E',
    aspect: 'aspect-[1/1]',
    tags: ['Open Source', 'Cryptography', 'Zero-Knowledge', 'Rust'],
    github: 'https://github.com',
    metrics: [
      { label: 'PROOF TIME', val: '120ms' },
      { label: 'VERIFICATION', val: '1.4ms' },
      { label: 'PROOF SIZE', val: '192 bytes' },
      { label: 'AUDIT COMPLIANT', val: 'SOC2 / ISO' },
    ],
    gallery: [
      palmImg,
      datacenterImg,
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    ],
    featured: true,
  },
  {
    id: 'monolith-to-mesh',
    number: '07',
    title: 'Monolith to Mesh',
    subtitle: 'Zero-Downtime Decoupling of 140+ Distributed Services',
    year: '2025',
    category: 'Infrastructure',
    client: 'Global Logistics & Supply Chain Enterprise',
    location: 'Singapore & Bangalore',
    description:
      'Architected the progressive strangler-fig migration of a 12-year-old monolithic Rails/PostgreSQL core into an event-driven Go and Rust service topology processing 650 million API calls daily with 99.999% uptime.',
    concept:
      'Employing dual-write verification gates and shadow traffic replay to mathematically prove zero regression before cutting over production DNS routes.',
    outcome:
      'Completed the 18-month migration with zero hours of customer-facing downtime; reduced deployment cycle time from 3 weeks to 14 minutes.',
    tools: ['Go', 'Kafka', 'PostgreSQL', 'AWS EKS', 'ArgoCD', 'Distributed Tracing (Jaeger)'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-[16/9]',
    tags: ['Infrastructure', 'Microservices', 'Migration', 'DevOps'],
    github: 'https://github.com',
    metrics: [
      { label: 'DAILY API CALLS', val: '650M' },
      { label: 'DOWNTIME OCCURRED', val: '0 seconds' },
      { label: 'DEPLOY FREQUENCY', val: '40+ / day' },
      { label: 'CLOUD SAVINGS', val: '$1.2M / yr' },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop',
      datacenterImg,
      archImg,
    ],
    featured: true,
  },
];

export const EXHIBITIONS: Exhibition[] = [
  {
    id: 'ex-01',
    number: '01',
    title: 'Scaling Beyond 1M Concurrent WebSockets',
    venue: 'GopherCon Europe, Hauptstadtsaal',
    location: 'Berlin, Germany',
    date: '21 Nov 2026',
    status: 'Upcoming',
    curator: 'Keynote Speaker · Systems Track',
    talkType: 'Keynote & Live Demo',
    description:
      'A deep dive into Linux epoll mechanics, zero-copy buffer pooling in Go, and architecting distributed state synchronization for high-density WebSocket clusters with sub-10ms delivery guarantees.',
    ticketsRemaining: 42,
  },
  {
    id: 'ex-02',
    number: '02',
    title: 'Zero-Allocation Memory Patterns in Modern Rust',
    venue: 'RustConf Global, Oregon Convention Center',
    location: 'Portland, USA',
    date: '20 Nov 2026',
    status: 'Upcoming',
    curator: 'Technical Session · Rust Core Ecosystem',
    talkType: 'Technical Deep-Dive',
    description:
      'Hands-on exploration of arena allocators, custom intrusive data structures, and avoiding heap thrashing in mission-critical low-latency stream processing pipelines.',
    ticketsRemaining: 65,
  },
  {
    id: 'ex-03',
    number: '03',
    title: 'Distributed CRDTs in Production: Lessons from Scale',
    venue: 'Strange Loop Conference, St. Louis Union Station',
    location: 'St. Louis, USA',
    date: '19 Nov 2026',
    status: 'Upcoming',
    curator: 'Invited Speaker · Distributed Consensus Track',
    talkType: 'Architecture Case Study',
    description:
      'Real-world operational trade-offs between Operation-based and State-based CRDTs, pruning historical vector clocks, and dealing with split-brain scenarios in peer-to-peer topologies.',
    ticketsRemaining: 15,
  },
  {
    id: 'ex-04',
    number: '04',
    title: 'Next-Gen Local-First Web Architecture',
    venue: 'QCon International, Queen Elizabeth II Centre',
    location: 'London, United Kingdom',
    date: '18 Nov 2026',
    status: 'Upcoming',
    curator: 'Keynote · Modern Web Foundations',
    talkType: 'Keynote & Architecture Blueprint',
    description:
      'How WebAssembly, WebGPU, and client-side embedded databases are reversing cloud centrality by moving heavyweight computation and AI inference back to user devices.',
    ticketsRemaining: 28,
  },
  {
    id: 'ex-05',
    number: '05',
    title: 'From Monolith to eBPF-Powered Micro-Meshes',
    venue: 'KubeCon + CloudNativeCon North America',
    location: 'Salt Lake City, USA',
    date: '12 Dec 2026',
    status: 'Upcoming',
    curator: 'Cloud Native Computing Foundation (CNCF)',
    talkType: 'Cloud Infrastructure Keynote',
    description:
      'Removing proxy sidecars and executing network security policies in the Linux kernel: benchmark comparisons, operational pitfalls, and autonomous telemetry at scale.',
    ticketsRemaining: 84,
  },
];

