# @ice/appear

React component for appear and disappear.

## Usage

```bash
npm i @ice/appear
```

```jsx
import VisibilityChange from '@ice/appear';

export default function Home() {
  return <VisibilityChange
    onAppear={() => {
      console.log('onAppear')
    }}
    onDisappear={() => {
      console.log('ondisAppear')
    }}
  >show something</VisibilityChange>
}
```
