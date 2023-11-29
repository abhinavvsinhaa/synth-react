import '../../../css/views/ct.css'

const Compile = () => {
  return (
    <div>
      <div className={'ct-header'}>
        <div className={'tab-details'}>
          <p className={'tab-name'}>Compile</p>
          <p className={'tab-description'}>See your code's compilation results here</p>
        </div>
      </div>
    </div>
  );
}

export const CT = () => {
  return (
    <div className={'ct'}>
      <Compile/>
    </div>
  );
}
