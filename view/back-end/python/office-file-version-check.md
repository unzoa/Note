# Office 文件版本检查

需要读取其中的元数据信息。在不同版本的Word中，元数据信息的格式和项可能会有所不同。

以下是一些可能有用的元数据信息字段，可以用来区分Word文档的不同版本：

1. 标题:根据标题字段，可以尝试分辨Word 2007或更高版本的.docx文件和Word 2003及以前版本的.doc文件。

2. 内容类型: Word 2007或更新版本的文档在元数据中包含了“Content-Type”字段，用于指明该文档的格式为“application/vnd.openxmlformats-officedocument.wordprocessingml.document”。而Word 2003及更早版本の文档的内容类型为“application/msword”。

3. 编码方式: Word 2007或更新版本的文档使用基于XML的格式进行存储，并使用UTF-8编码。而Word 2003及早期版本的文档，则使用二进制格式进行存储。

## python如何分辨doc文件版本

使用python-docx库，可以使用如下代码来读取.docx文件的元数据信息：

```py
from docx import Document

doc = Document('example.docx') # 要读取的文档文件名

print(doc.core_properties.title) # 打印文档标题
print(doc.core_properties.content_type) # 打印文档内容类型
print(doc.core_properties.encoding) # 打印文档编码方式
```

对于.doc文件，你可以使用PyWin32库读取元数据信息，例如：

```py
import win32com.client

word = win32com.client.Dispatch('Word.Application')
doc = word.Documents.Open('example.doc') # 要读取的文档文件名

print(doc.BuiltInDocumentProperties('Title')) # 打印文档标题
print(doc.BuiltInDocumentProperties('ContentType')) # 打印文档内容类型
print(doc.BuiltInDocumentProperties('Encoding')) # 打印文档编码方式
```

## nodejs

以下是使用docx-parser读取Word文档的元数据信息的示例代码：

```js
const fs = require('fs');
const DocxParser = require('docx-parser').DocxParser;

// 读取Word文档文件
const filePath = 'example.doc';
const fileContent = fs.readFileSync(filePath);

// 解析文件元数据信息
const docParser = new DocxParser();
const metadata = docParser.parse(fileContent).metadata;

console.log(metadata.title); // 打印文档标题
console.log(metadata.contentType); // 打印文档内容类型
console.log(metadata.encoding); // 打印文档编码方式
```