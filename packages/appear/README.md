# @ice/appear

React component for supporting `appear` and `disappear` events.  

## Usage

```bash
npm i @ice/appear -S
```

```jsx
import VisibilityChange from '@ice/appear';

export default function Home() {
  return (
    <VisibilityChange
      onAppear={() => {
        console.log('Something has been shown.')
      }}
      onDisappear={() => {
        console.log('Something has disappeard.')
      }}
    >
      Anything you want to show.
    </VisibilityChange>
  );
}
```
