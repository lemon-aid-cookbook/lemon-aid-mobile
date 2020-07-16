export const IS_DEV = true;

export function formatCurrency(num) {
  const values = num.toString().replace(/\D/g, '');
  return values.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const convertNumber = (x) => {
  const values = x.toString().replace(/\D/g, '');
  return values;
};

export const reConvertMoney = (x) => {
  let s;
  s = x.split('.');
  s = s.join('');
  return s;
};

export function log(...arg) {
  if (__DEV__) {
    console.info(
      arg
        .map((i) =>
          ['string', 'number'].indexOf(typeof i) === -1
            ? JSON.stringify(i, null, ' ')
            : i,
        )
        .join(' '),
    );
  }
}

export const getCurrentRouteName = (state) => {
  const route = state.routes[state.index];
  return typeof route.index === 'undefined'
    ? route.routeName
    : getCurrentRouteName(route);
};
