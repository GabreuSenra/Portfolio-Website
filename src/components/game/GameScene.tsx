import { Canvas } from '@react-three/fiber';
import { OrthographicCamera, AdaptiveDpr } from '@react-three/drei';
import { Suspense, useState, useCallback, useEffect } from 'react';
import * as THREE from 'three';
import Player from './Player';
import IslandMesh from './Island';
import World from './World';
import { ISLANDS, Island } from '@/data/projects';
import ProjectCard from '@/components/hud/ProjectCard';
import LinksPanel from '@/components/hud/LinksPanel';
import GameControls from '@/components/hud/GameControls';
import CompassHUD from '@/components/hud/CompassHUD';
import { Environment } from '@react-three/drei';

const PROXIMITY_THRESHOLD = 4.5;

export default function GameScene() {
  const [playerPos, setPlayerPos]       = useState(new THREE.Vector3(0, 0, 0));
  const [nearIsland, setNearIsland]     = useState<Island | null>(null);
  const [flashActive, setFlashActive]   = useState(false);
  const [linksPanelOpen, setLinksPanelOpen] = useState(false);

  const handlePositionChange = useCallback((pos: THREE.Vector3) => {
    setPlayerPos(pos.clone());

    let closest: Island | null = null;
    let minDist = PROXIMITY_THRESHOLD;

    for (const island of ISLANDS) {
      const dx = pos.x - island.position[0];
      const dz = pos.z - island.position[2];
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < minDist) {
        minDist = dist;
        closest = island;
      }
    }
    setNearIsland(closest);
  }, []);

  const handleInteract = useCallback((island: Island) => {
    setFlashActive(true);
    setTimeout(() => {
      setFlashActive(false);
      window.open(island.url, '_blank');
    }, 180);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.code === 'Space' || e.code === 'Enter') && nearIsland) {
        e.preventDefault();
        handleInteract(nearIsland);
      }
      if (e.code === 'Tab') {
        e.preventDefault();
        setLinksPanelOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [nearIsland, handleInteract]);

  return (
    <div className="relative w-full h-full select-none">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: false }}
        style={{ background: 'hsl(222, 47%, 5%)' }}
      >
        <AdaptiveDpr pixelated />
        <fog attach="fog" args={['#071220', 65, 170]} />

        <OrthographicCamera
          makeDefault
          position={[20, 20, 20]}
          zoom={28}
          near={0.1}
          far={300}
        />

        <Environment preset="sunset" />

        <Suspense fallback={null}>
          <World />
          <Player onPositionChange={handlePositionChange} />
          {ISLANDS.map(island => {
            const dx = playerPos.x - island.position[0];
            const dz = playerPos.z - island.position[2];
            const dist = Math.sqrt(dx * dx + dz * dz);
            const isNear = dist < PROXIMITY_THRESHOLD;

            return (
              <IslandMesh
                key={island.id}
                project={island}
                isNear={isNear}
                onClick={() => handleInteract(island)}
              />
            );
          })}
        </Suspense>
      </Canvas>

      {/* HUD */}
      <ProjectCard project={nearIsland} onInteract={handleInteract} />
      <CompassHUD />
      <GameControls
        linksPanelOpen={linksPanelOpen}
        onToggleLinks={() => setLinksPanelOpen(prev => !prev)}
      />
      <LinksPanel isOpen={linksPanelOpen} onClose={() => setLinksPanelOpen(false)} />

      {/* Flash on interact */}
      {flashActive && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(255,255,255,0.1)', zIndex: 100 }}
        />
      )}
    </div>
  );
}
