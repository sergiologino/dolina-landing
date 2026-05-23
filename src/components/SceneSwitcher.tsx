import type { SceneId } from '../data/content';
import { scenes } from '../data/content';

type SceneSwitcherProps = {
  activeScene: SceneId;
  onSceneChange: (scene: SceneId) => void;
};

export function SceneSwitcher({ activeScene, onSceneChange }: SceneSwitcherProps) {
  return (
    <div className="scene-switcher" role="tablist" aria-label="Переключатель сцен Долины">
      {scenes.map((scene) => (
        <button
          className={`scene-tab ${activeScene === scene.id ? 'is-active' : ''}`}
          type="button"
          role="tab"
          aria-selected={activeScene === scene.id}
          aria-controls={`scene-panel-${scene.id}`}
          key={scene.id}
          onClick={() => onSceneChange(scene.id)}
        >
          <span>{scene.label}</span>
          <small>{scene.marker}</small>
        </button>
      ))}
    </div>
  );
}
