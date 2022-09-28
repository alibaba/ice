import style from './cssWithEscapedSymbols.module.css';

console.log('style', style.test);

export default function Bar() {
  return (
    <div className={style.test}>
      bar
    </div>
  );
}
