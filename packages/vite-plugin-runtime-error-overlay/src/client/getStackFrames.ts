import getOriginalFrame from './getOriginalFrame';
import parserError from './parser';
import type { StackFrame } from './stack-frame';

async function getStackFrames(
  error: Error,
  contextSize = 3
): Promise<StackFrame[]> {
  const parsedFrames = parserError(error);
  // TODO enhanced frames with error.__unmap_source
  const enhancedFramesPromise = getOriginalFrame(parsedFrames, contextSize);
  const enhancedFrames = await enhancedFramesPromise;
  if (enhancedFrames
    .map(frame => frame.originalFileName)
    .filter(frame => frame != null && frame.indexOf('node_modules') === -1).length === 0) {
    return null;
  }
  return enhancedFrames.filter(
    ({ functionName }) => functionName == null ||
      functionName.indexOf('__stack_frame_overlay_proxy_console__') === -1
  );
}

export default getStackFrames;