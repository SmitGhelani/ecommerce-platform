const GET = async() => {
    return Response.json({
        success: true,
        razorpaykey: process.env.RAZORPAY_API_KEY
    })
}

export {GET};