// @ts-expect-error TS(2584): Cannot find name 'document'. Do you need to change... Remove this comment to see the full error message
const fileInput= document.getElementById("image")
// @ts-expect-error TS(2584): Cannot find name 'document'. Do you need to change... Remove this comment to see the full error message
const dragZone= document.getElementById("result-image")
// @ts-expect-error TS(2584): Cannot find name 'document'. Do you need to change... Remove this comment to see the full error message
const img= document.getElementById("img-result")

dragZone.addEventListener('click', () => fileInput.click)
dragZone.addEventListener('dragover', () => {
    // @ts-expect-error TS(2304): Cannot find name 'e'.
    e.preventDefault()
    //dragZone.classList.add("classname styles")
    
})
dragZone.addEventListener('dragleave', () => {
    // @ts-expect-error TS(2304): Cannot find name 'e'.
    e.preventDefault()
    //dragZone.classList.remove("classname styles")
    
})

export const uploadImage = (file: any) => {
    // @ts-expect-error TS(2552): Cannot find name 'FileReader'. Did you mean 'fileR... Remove this comment to see the full error message
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.addEventListener('load', (e: any) => {
        img.setAttribute('src', e.target.result)
        // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
        console.log(e.target)
    })
}

dragZone.addEventListener('drop', () => {
    // @ts-expect-error TS(2304): Cannot find name 'e'.
    e.preventDefault()

    // @ts-expect-error TS(2304): Cannot find name 'e'.
    fileInput.files = e.dataTransfer.files
    const file = fileInput.files[0]
    // @ts-expect-error TS(2584): Cannot find name 'console'. Do you need to change ... Remove this comment to see the full error message
    console.log(file)
    uploadImage(file)
})
