// TODO: need RuntimeAPI type
export default ({ addProvider }) => {
  console.log(123123123);
  addProvider(({ children }: any) => {
      return (
        <div>
          3333
          {children}
        </div>
      );
    });
};
