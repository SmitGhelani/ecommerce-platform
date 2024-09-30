import formatDateTime from "@/app/utils/formatDateTime";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CommentBox = ({prodId}:any) => {

    const pID:string = prodId
    const [commentData, setCommentData] = useState<any>([])
    const [commentError, setCommentError] = useState("");
    const route = useRouter();
    const user = useSelector((state:any)=> state.user)
    const [commentSuccess, setCommentSuccess] = useState(false)

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
        fetch("http://localhost:3000/api/fetchComments",{method:"POST",body:JSON.stringify({
            productId: pID
        })}).then((response)=>
            response.json()
        ).then((data)=>
            setCommentData(data.comments)
        ).catch((error)=>{
            console.log(error)
        })
    },[pID, commentSuccess])

    const addComment = async(values:any) => {
        console.log(user.user)
        const commentResponse = await fetch("http://localhost:3000/api/addComment",{method:"POST",body:JSON.stringify({
            "userId": user.user._id,
            "comment": values.comment,
            "productId": pID,
            "username": user.user.name,
            "email": user.user.email
        })})
        const data = await commentResponse.json()
        console.log(data)
        if (!data.success){
            setCommentSuccess(!commentSuccess)
            setCommentError("Your comment is not added")
        }else{
            values.comment = ""
            setCommentSuccess(!commentSuccess)
        }
    }
    
    return (
        <Formik initialValues={initialValues} validate={validate} onSubmit={addComment}>
        {
          (formik)=>{
              const {values, errors, touched, handleBlur, handleChange, handleSubmit} = formik;
              return(
                <div className="bg-slate-500 rounded-lg border p-4 my-4 m-5">
                <h3 className="font-bold text-white">Product Reviews</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            {
                                commentData && commentData.map((comment:any)=>(
                                    <div key={comment._id} className="flex border bg-zinc-200 rounded-md p-3 ml-3 my-3">
                                        <img src="https://banner2.cleanpng.com/20180411/due/kisspng-computer-icons-user-profile-info-5acde51e963fe2.9717334815234429746154.jpg" className="object-cover w-10 h-10 rounded-full border-2 border-emerald-400  shadow-emerald-400" />
                                        <div className="flex flex-col gap-3 items-left ml-3 w-full">
                                            <div className="flex flex-row items-center">
                                                <h3 className="font-bold">
                                                    {comment.username}
                                                </h3>
                                                <p className="text-sm items-center justify-center ml-3 font-medium text-gray-400">on {formatDateTime(comment.createdAt)}</p>
                                            </div>
                                            <p className="text-slate-500 font-normal text-base">
                                            {comment.comment}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }

                        </div>
                        <div className="flex flex-row w-full p-3 my-2 mr">
                            <textarea
                                value={values.comment}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className="bg-gray-100 rounded-full border border-gray-400 leading-normal resize-none w-full h-12 py-2 px-4 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                                name="comment" placeholder='Type Your Comment' required></textarea>
                            
                            <div className="w-1/4 flex justify-end px-3">
                                <input type='submit' className="bg-slate-100 hover:bg-slate-700 hover:text-white text-black font-bold py-3 px-5 rounded-full" value='Post Comment' />
                            </div>
                            {commentError && (
                              <span style={{color:"red"}} className="error">{commentError}</span>
                            )}
                        </div>
                    </form>
                </div>
            );
          }}
      </Formik>
    )
}

export default CommentBox;