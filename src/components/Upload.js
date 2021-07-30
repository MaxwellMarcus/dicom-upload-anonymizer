import Button from '@material-ui/core/Button'
import { log, script } from '../utils'
import JSZip from 'jszip'
import Anonymizer from 'dicomedit'

function Upload() {

    const onFileUpload = async (event) => {

        // const zip = new JSZip()
        // let files = []


        // zip.loadAsync(event.target.files[0])
        //     .then(zip => {
        //         zip.forEach((relativePath, file) => {
        //             if (relativePath.includes('dcm')) {
        //                 zip.file(file.name).async('arraybuffer')
        //                     .then(file => {
        //                         files.push(file)
        //                     })
        //             }
        //         })
        //     })
        //     .then((files) => {
        //         for (let i = 0; i < files.length; i++) {

        //             let reader = new FileReader();
        //             let file = files[i]

        //             reader.onload = async function () {
        //                 log('3', reader, reader.result)
        //                 let arrayBuffer = new Uint8Array(reader.result);

        //                 const anonymizer = new Anonymizer(script);
        //                 anonymizer.loadDcm(arrayBuffer)
        //                 await anonymizer.applyRules();

        //                 log(file.name, anonymizer.outputDict)
        //                 // arrayBuffer = anonymizer.write()
        //             }

        //             reader.onerror = function (error) {
        //                 log(error)
        //             }

        //             try {

        //                 reader.readAsArrayBuffer(file);

        //             } catch (error) {
        //                 log(error)
        //             }
        //         }

        //     })



        //logic when one/many not-zipped dcm files are selected in upload
        for (let i = 0; i < event.target.files.length; i++) {

            let reader = new FileReader();
            let file = event.target.files[i]

            reader.onload = async function () {

                let arrayBuffer = new Uint8Array(reader.result);

                const anonymizer = new Anonymizer(script);
                anonymizer.loadDcm(arrayBuffer)
                await anonymizer.applyRules();

                log(file.name, anonymizer.outputDict)
                // arrayBuffer = anonymizer.write()
            }

            reader.onerror = function (error) {
                log(error)
            }

            try {
                reader.readAsArrayBuffer(file);
            } catch (error) {
                log(error)
            }
        }

    }

    return (
        <label htmlFor='upload-file'>
            <input
                hidden
                id='upload-file'
                data-testid='upload-file'
                name='upload-file'
                type='file'
                multiple={true}
                onChange={(event) => onFileUpload(event)}
            />
            <br />
            <Button color='secondary' variant='contained' component='span'>
                Upload
            </Button>
            <br />
        </label>
    );
}

export default Upload;