/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./views/**/*.ejs", // Quét tất cả file EJS trong thư mục views
      "./public/**/*.js",  // Nếu có JS custom trong thư mục public
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  