import { assets } from "../assets/assets"
import Title from "../components/Title"
import NewsletterBox from "../components/NewsletterBox"


const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16 ">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray">
            <p className="text-gray-600">We are a team of passionate individuals committed to delivering the best products and services to our customers.</p>
            <p className="text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus iusto voluptatibus, quo quisquam odio culpa, animi omnis, expedita perferendis necessitatibus reiciendis inventore. Ex, nulla sequi?</p>
            <b className="text-gray-800">Our Mission</b>
            <p className="text-gray-600">To empower individuals and businesses by providing innovative solutions and exceptional customer service.</p>
        </div>

      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US?"}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-sm">We adhere to the highest standards of quality in our products and services.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-sm">We adhere to the highest standards of quality in our products and services.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-sm">We are committed to providing our customers with the best possible experience.</p>
        </div>

      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About
