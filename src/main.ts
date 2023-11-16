import { Exception, Result } from '@zxing/library'
import './style.css'
import { BrowserQRCodeReader, IScannerControls } from '@zxing/browser'
import { DecodeContinuouslyCallback } from '@zxing/browser/esm/common/DecodeContinuouslyCallback'

const handleResult: DecodeContinuouslyCallback = (result: Result | undefined, error: Exception | undefined, controls: IScannerControls) => {
  if (result) {
    window.alert(result)
  }
}

const codeReader = new BrowserQRCodeReader()
const videoInputDevices = await BrowserQRCodeReader.listVideoInputDevices();

// choose your media device (webcam, frontal camera, back camera, etc.)
let selectedDeviceId: string | undefined = videoInputDevices[0].deviceId;
let controls: IScannerControls | null;
let delay: number = 250;

const changeCam = async () => {
  let isRunning = controls ? true : false

  await stop()

  selectedDeviceId = camSelect?.value

  if (startButton) {
    startButton.disabled = selectedDeviceId ? false : true
  }

  if (selectedDeviceId && isRunning) {
    await new Promise((resolve) => setTimeout(() => resolve('continue'), delay))
    await start()
  }
}

const start = async () => {
  console.log(`Started decode from camera with id ${selectedDeviceId}`);
  try {
    controls = await codeReader.decodeFromVideoDevice(selectedDeviceId, previewElem, handleResult)
  } catch (e) {
    window.alert(e)
  }
}

const stop = async () => {
  controls?.stop()
  controls = null
}

const previewElem = document.querySelector<HTMLVideoElement>('#output') || undefined;

const startButton = document.querySelector<HTMLButtonElement>('#start')
const stopButton = document.querySelector<HTMLButtonElement>('#stop')
startButton?.addEventListener('click', start)
stopButton?.addEventListener('click', stop)

const camSelect = document.querySelector<HTMLSelectElement>('#cams')
camSelect?.addEventListener('change', changeCam)

videoInputDevices.forEach(device => {
  const option = document.createElement('option')
  option.value = device.deviceId
  option.innerText = device.label
  if (option.value === selectedDeviceId) {
    option.selected = true
  }

  camSelect?.append(option)
})

const delays = document.querySelector('#delays')
const checkedRadio = delays?.querySelector("input[name='change-delay']:checked")

if (checkedRadio instanceof HTMLInputElement && checkedRadio.value) {
  delay = Number(checkedRadio.value)
  console.log(delay)
}

delays?.addEventListener("change", (ev) => {
  if (ev.target instanceof HTMLInputElement) {
    delay = Number(ev.target.value)
    console.log(delay)
  }
})