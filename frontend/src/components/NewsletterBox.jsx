
const NewsletterBox = () => {

    const onSubmitHandler=(event)=>{
        event.preventDefault();
    }

  return (
    <div className="text-center">
        <p className="text-2xl font-medium text-gray-800">Subscribe now & get 20% off</p>
        <p className="text-gray-400 mt-3">
            Enter your email address to receive the latest updates and offers.
        </p>
        <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
            <input type="email" placeholder="Enter your email" className="w-full sm:flex-1 outline-none" required />
            <button type="submit" className="bg-gray-800 text-white py-2 px-4">Subscribe</button>
        </form>
      
    </div>
  )
}

export default NewsletterBox
