import axios, { AxiosResponse } from "axios";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { comment } from "postcss";
import { pid } from "process";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CommentBox = ({prodId}:any) => {

    const pID:string = prodId
    const [commentData, setCommentData] = useState<any>([])
    const [commentError, setCommentError] = useState("");
    const route = useRouter();
    const user = useSelector((state:any)=> state.user)

    const initialValues = {
        comment:""
    };

    const validate = (values:any) => {
        let errors:any = {};
        if (!values.comment) {
          errors.comment = "Comment message is required";
        }

        return errors;
    };
    

    useEffect(()=>{
        axios.post("http://localhost:3000/api/fetchComments",{
            productId: pID
        }).then((response)=>{
            setCommentData(response.data.comments)
        }).catch((error)=>{
            console.log(error)
        })
    },[commentData])

    const addComment = async(values:any) => {
        const commentResponse:AxiosResponse = await axios.post("http://localhost:3000/api/addComment",{
            "userId": user.user._id,
            "comment": values.comment,
            "productId": pID,
            "username": user.user.name,
            "email": user.user.email
        })

        if (!commentResponse.data.success){
            setCommentError("Your comment is not added")
        }else{
            values.comment = ""
        }
    }
    
    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={addComment}>
        {
          (formik)=>{
              const {values, errors, touched, handleBlur, handleChange, handleSubmit} = formik;
              return(
                <div className="w-full bg-white rounded-lg border p-4 my-4">
                <h3 className="font-bold">Product Reviews</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            {
                                commentData && commentData.map((comment:any)=>(
                                    <div key={comment._id} className="border rounded-md p-3 ml-3 my-3">
                                        <div className="flex gap-3 items-center">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4mfcCBaUG6YTp9y_QD0OBm9SVoPZjj_hjT2CQhq17whHvcttXcBJh1nPf-7N-tu-hTAk&usqp=CAU" className="object-cover w-8 h-8 rounded-full border-2 border-emerald-400  shadow-emerald-400" />
                                            <h3 className="font-bold">
                                                {comment.username}
                                            </h3>
                                        </div>
                                        <p className="text-gray-600 mt-2">
                                        {comment.comment}
                                        </p>
                                    </div>
                                ))
                            }

                        </div>
                        <div className="w-full px-3 my-2">
                            <textarea
                                value={values.comment}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                name="comment" placeholder='Type Your Comment' required></textarea>
                        </div>
                        <div className="w-full flex justify-end px-3">
                            <input type='submit' className="px-2.5 py-1.5 rounded-md text-white text-sm bg-indigo-500" value='Post Comment' />
                        </div>
                        {errors.comment && touched.comment && (
                          <span style={{color:"red"}} className="error">{comment.password}</span>
                        )}
                        {commentError && (
                          <span style={{color:"red"}} className="error">{commentError}</span>
                        )}
                    </form>
                </div>
            );
          }}
      </Formik>
    )
}

export default CommentBox;