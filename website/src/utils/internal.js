const EVENT_NAME = 'check:internal';
let pending = false;

export function isIntranet() {
  if (pending === false) {
    pending = true;
    return _checkIntranet().then((validAuthorization) => {
      if (validAuthorization) {
        window.dispatchEvent(new CustomEvent(EVENT_NAME));
        pending = false;
      }
    });
  } else {
    return new Promise((resolve) => {
      window.addEventListener(EVENT_NAME, () => {
        resolve();
      });
    });
  }
}

async function _checkIntranet() {
  try {
    const checkResult = await fetch(
      'https://alilang-intranet.alibaba-inc.com/is_white_list.json',
      { headers: { 'need-json': '1' } },
    ).then((res) => res.json());
    return (
      checkResult &&
      checkResult.content === true &&
      checkResult.hasError === false
    );
  } catch (error) {
    return false;
  }
}
