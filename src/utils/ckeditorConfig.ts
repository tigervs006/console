export const ckeditorConfig = {
  language: 'zh-cn',
  toolbar: {
    items: [
      'paragraph',
      'heading1',
      'heading2',
      'heading3',
      '|',
      'fontColor',
      'fontBackgroundColor',
      'fontSize',
      'fontFamily',
      'bold',
      'italic',
      'highlight',
      '|',
      'link',
      'todoList',
      'bulletedList',
      'numberedList',
      'alignment',
      'outdent',
      'indent',
      '|',
      'imageInsert',
      'mediaEmbed',
      'insertTable',
      '|',
      'horizontalLine',
      'removeFormat',
      'undo',
      'redo',
      '|',
      'codeBlock',
      'findAndReplace',
      'sourceEditing',
    ],
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true,
    },
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    tableProperties: {
      defaultProperties: {
        borderStyle: 'dashed',
        borderColor: 'hsl(0, 0%, 90%)',
        borderWidth: '3px',
        alignment: 'left',
      },
    },
    tableCellProperties: {
      defaultProperties: {
        horizontalAlignment: 'right',
        verticalAlignment: 'bottom',
        padding: '5px',
      },
    },
    defaultHeadings: { rows: 1, columns: 1 },
  },
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
    ],
  },
  image: {
    toolbar: ['imageTextAlternative', 'imageStyle:inline', 'imageStyle:block', 'imageStyle:side'],
  },
  mediaEmbed: {
    providers: [
      {
        name: 'TencentVideo',
        url: /^https:\/\/v.qq\.com\/txp\/iframe\/player.html\?vid=(\w+)/,
        html: (match: Record<string, any>) =>
          `<iframe src="${match.vodeoId}" allowFullScreen="true"></iframe>`,
      },
    ],
  },
  ckfinder: {
    uploadUrl:
      'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json',
    options: {
      resourceType: 'Images',
    },
  },
  simpleUpload: {
    uploadUrl: 'https://demo.brandsz.cn/upload',
    headers: { Authorization: localStorage.getItem('ACCESS_TOKEN') },
  },
};
