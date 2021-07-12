import {instances, ResponseType} from "./api";
import {PhotosType, ProfileType} from "../types/types";
type SavePhotosResponseDataType={
    photos: PhotosType
}
export const profileAPI = {
    getProfile(userId: number) {
        return instances.get<ProfileType>(`profile/${userId}`).then(res => res.data)
    },
    getStatus(userId: number) {
        return instances.get<string>(`profile/status/${userId}`).then(res => res.data)
    },
    updateStatus(status: string) {
        return instances.put<ResponseType<{status: string | null}>>(`profile/status/`, {status: status}).then(res => res.data)
    },
    savePhotos(file: File) {
        let formData = new FormData();
        formData.append('image', file);
        return instances.put<ResponseType<SavePhotosResponseDataType>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instances.put<ResponseType<ProfileType>>('profile', profile).then(res => res.data)
    }
};