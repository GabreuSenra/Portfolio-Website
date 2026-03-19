import GameScene from '@/components/game/GameScene';

export default function Index() {
  return (
    <div className="w-screen h-screen overflow-hidden" style={{ background: 'hsl(222, 47%, 8%)' }}>
      <GameScene />
    </div>
  );
}
