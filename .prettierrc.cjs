module.exports = {
  // singleQuote: false, // Dùng dấu nháy đơn thay vì nháy kép
  endOfLine: 'lf', // Định dạng xuống dòng theo 'lf' (Linux/Mac)
  trailingComma: 'all', // Dấu phẩy ở cuối object/array
  tabWidth: 2, // Sử dụng 2 khoảng trắng cho tab
  semi: true, // Bắt buộc dấu chấm phẩy ở cuối dòng
  printWidth: 100, // Giới hạn độ dài dòng (mặc định là 80)
  bracketSpacing: true, // Dấu {} có khoảng cách
  arrowParens: 'always', // Dùng dấu ngoặc đơn cho arrow function (dễ đọc hơn)
  jsxSingleQuote: true, // Dùng nháy đôi trong JSX
  overrides: [
    {
      files: '*.json',
      options: {
        printWidth: 200, // JSON có thể dài hơn
      },
    },
    {
      files: '*.md',
      options: {
        proseWrap: 'always', // Xuống dòng tự động trong Markdown
      },
    },
  ],
};
