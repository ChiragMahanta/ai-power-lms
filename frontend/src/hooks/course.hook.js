import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCourseApi, getCourseApi, getSingleCourseApi, getPurchaseCourseApi, getAllPurchaseCourseApi } from '@/Api/course.api'

export const useCreateCourseHook = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createCourseApi,
    onSuccess: () => {
      queryClient.invalidateQueries(['getCourse'])
    },
    onError: (err) => {
      console.log(err)
    }
  })
}

export const useGetCourseHook = (search) => {
  return useQuery({
    queryFn: () => getCourseApi(search),
    queryKey: ['getCourse', search]
  })
}

export const useGetSingleCourseHook = (id) => {
  return useQuery({
    queryFn: () => getSingleCourseApi(id),
    queryKey: ['getSingleCourse', id]
  })
}

export const useGetPurchaseCourse = (courseId) => {
  return useQuery({
    queryFn: () => getPurchaseCourseApi(courseId),
    queryKey: ['getPurchaseCourse', courseId]
  })
}

export const useGetAllPurchaseCourseApi = () => {
  return useQuery({
    queryFn: () => getAllPurchaseCourseApi(),
    queryKey: ['getAllPurchaseCourse']
  })
}