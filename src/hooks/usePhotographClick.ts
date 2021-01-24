import { ref } from 'vue'
import { Toast } from 'vant'
import { config } from '@/utils/config'
import { getHasPermission } from '@/utils/util'
declare const window: Window & { api: any }

const usePhotographClick = () => {
    const base64Img = ref("")
    // 点击事件
    const photograph = async () => {
        if (config.$appMode) {
            // 演示获取摄像头权限
            const camera = new Promise((resolve, reject) => {
                getHasPermission('camera', function (ret: boolean) {
                    if (ret) {
                        resolve(ret)
                    } else {
                        reject(ret)
                    }
                })
            })

            // 演示获取相册权限
            const photos = new Promise((resolve, reject) => {
                getHasPermission('photos', function (ret: boolean) {
                    if (ret) {
                        resolve(ret)
                    } else {
                        reject(ret)
                    }
                })
            })

            Promise.all([camera, photos])
                .then(result => {
                    if (!result[0]) {
                        Toast('获取不到摄像头权限')
                        return
                    }
                    if (!result[1]) {
                        Toast('获取不到相册权限')
                        return
                    }
                    window.api.getPicture(
                        {
                            sourceType: 'camera',
                            encodingType: 'jpg',
                            mediaValue: 'pic',
                            destinationType: 'base64',
                            allowEdit: true,
                            quality: 50,
                            targetWidth: 100,
                            targetHeight: 100,
                            saveToPhotoAlbum: false,
                        },
                        function (ret: any) {
                            if (ret) {
                                base64Img.value = ret.base64Data
                            } else {
                                Toast('不拍啦')
                            }
                        }
                    )
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            Toast('请在apicloud中测试该功能')
        }
    }


    return { base64Img, photograph }
}

export default usePhotographClick
