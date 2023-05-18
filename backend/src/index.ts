import app from './app';
// Get port from process envrinment or set default 3000
const PORT = process.env.PORT || 3000;
// Start server
const server = app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});

export default server;
