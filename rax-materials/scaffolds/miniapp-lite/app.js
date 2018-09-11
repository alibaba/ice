import app from '@core/app';

app.on('show', () => {
  console.log('show');
});
app.on('hide', () => {
  console.log('hide');
});
