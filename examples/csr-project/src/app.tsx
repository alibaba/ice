console.log('__LOG__');
console.warn('__WARN__');
console.error('__ERROR__');

export const auth = () => {
  return {
    initialAuth: {
      admin: true,
    },
  };
};

export default {};