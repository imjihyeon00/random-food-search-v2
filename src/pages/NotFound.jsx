import ImageMessage from "../components/ImageMessage";
import Error404Img from "../assets/404_error_icon.svg"

export default function NotFound() {
  return <ImageMessage src={Error404Img} text="찾을 수 없는 페이지 입니다."></ImageMessage>;
};
