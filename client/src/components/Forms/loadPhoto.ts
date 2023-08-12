const fileInput= document.getElementById("image")
const dragZone= document.getElementById("result-image")
const img= (document as any).getElementById("img-result")

(dragZone as any).addEventListener('click', () => (fileInput as any).click)
(dragZone as any).addEventListener('dragover', () => {
    // @ts-expect-error TS(2304): Cannot find name 'e'.
    e.preventDefault()
    //dragZone.classList.add("classname styles")
    
})
(dragZone as any).addEventListener('dragleave', (e: any) => {
    e.preventDefault()
})

export const uploadImage = (file: any) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.addEventListener('load', (e: any) => {
        img.setAttribute('src', e.target.result)
        console.log(e.target)
    })
}

(dragZone as any).addEventListener('drop', (e: any) => {
    e.preventDefault()

    (fileInput as any).files = e.dataTransfer.files
    const file = (fileInput as any).files[0]
    console.log(file)
    uploadImage(file)
})
