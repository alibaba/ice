import moduleStyle from './x.module.less';
// @ts-ignore
import style from './x.less';


export default function InlineLess() {
  return (<div>
    <div>
      <h2>ModuleStyle</h2>
      <pre>
        <code>
          {JSON.stringify(moduleStyle, null, 2)}
        </code>
      </pre>
    </div>
    <div>
      <h2>Style</h2>
      <pre>
        <code>
          {JSON.stringify(style, null, 2)}
        </code>
      </pre>
    </div>
  </div>);
}
