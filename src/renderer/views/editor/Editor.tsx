import { FallbackCTABtns } from '../../constants';

export const Editor = () => {

  const RenderFallback = () => {
    return (
      <div id={'synth-editor-fallback-container'}>
        <div id={'synth-editor-fallback-greeting-div'}>
          Welcome to SynthCode!
        </div>
        <div id={'synth-editor-fallback-actionbtn-container'}>
          {
            FallbackCTABtns.map((ctaBtn, id) => (
              <div onClick={ctaBtn.onClick} id={'synth-editor-fallback-actionbtn'}>
                {ctaBtn.text}
              </div>
            ))
          }
        </div>
      </div>
    );
  };

  return (
    <div id={'synth-editor'}>
      <RenderFallback />
    </div>
  );
};
