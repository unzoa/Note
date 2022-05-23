import JSZipUtils from 'jszip-utils'
import Docxtemplater from 'docxtemplater'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import ImageModule from 'open-docxtemplater-image-module'

/**
 * [export word]
 * @param  {String} tempDocUrl [source url]
 * @param  {Object} docData    [export data]
 * @param  {String} fileName   [export name]
 * @param  {Array}  imgSize    [same img size]
 */
export default (tempDocUrl, docData, fileName = 'sample Word', imgSize) => {
  /**
   * [read template.docx to binary]
   * @param content [template content]
   */
  JSZipUtils.getBinaryContent(tempDocUrl, function (error, content) {
    if (error) {
      throw error
    }

    let zip = new JSZip(content)
    let doc = new Docxtemplater()
      .loadZip(zip)
      .attachModule(imageModule(imgSize))

    doc.setData(docData)

    try {
      // use export value replace temp variable
      doc.render()
    } catch (error) {
      let e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties
      }
      console.log(JSON.stringify({ error: e }))
      throw error
    }

    // build a zip file stand for docxtemplater( not a  real file, but in memory)
    let out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })

    saveAs(out, fileName + '.docx')
  })
}

/**
 * export image：
 * 1. use open-docxtemplater-image-module, edit imageModule function
 * 2. new Docxtemplater(): use api：attachModule to load ImageModule
 * 3. doc.setData binding img key should be a base64 file
 * 4. temp.docx: imgage key is diffrent form normal key is {%imageVariable}
 * If you would like to choose which images should be centered one by one:
   - Set the global switch to false opts.centered = false.
   - Use {%image} for images that shouldn't be centered.
   - Use {%%image} for images that you would like to see centered.
 *
 */

function imageModule (size = [200, 200]) {
  let opts = {}
  opts.centered = true // img center, key in temp file is {%%image}
  opts.fileType = 'docx'

  /**
   * [description]
   * @param  {[type]} tagValue [base64 or img url，but not support url]
   * @param  {[type]} tagName  [key in docData]
   * @return {[type]}          [buffer]
   */
  opts.getImage = (tagValue, tagName) => {
    return base64DataURLToArrayBuffer(tagValue)
  }

  /**
   * [getSize description]
   * @param  {[type]} img      [buffer obj]
   * @param  {[type]} tagValue [base64 or img url, but not support url]
   * @param  {[type]} tagName  [img key in docData]
   * @return {[type]}          [img width, height]
   */
  opts.getSize = (img, tagValue, tagName) => {
    return size
  }

  return new ImageModule(opts)
}

// transform format of export img
function base64DataURLToArrayBuffer (dataURL) {
  const base64Regex = /^data:image\/(png|jpg|svg|svg\+xml);base64,/
  if (!base64Regex.test(dataURL)) {
    return false
  }
  const stringBase64 = dataURL.replace(base64Regex, '')
  let binaryString
  if (typeof window !== 'undefined') {
    binaryString = window.atob(stringBase64)
  } else {
    binaryString = Buffer.from(stringBase64, 'base64').toString('binary')
  }
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    const ascii = binaryString.charCodeAt(i)
    bytes[i] = ascii
  }
  return bytes.buffer
}
