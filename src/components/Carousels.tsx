import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
export default function Carousels() {
	const { currentUser } = useContext(AuthContext);
	const images = [
		"https://media.istockphoto.com/id/1321121760/ko/%EB%B2%A1%ED%84%B0/%EB%82%A8%EC%9E%90-%EB%82%A8%EC%9E%90%EB%8A%94-%EC%97%AC%EC%9E%90%EC%97%90%EA%B2%8C-%EB%8F%84%EC%9B%80%EC%9D%98-%EC%86%90%EA%B8%B8%EC%9D%84-%ED%99%95%EC%9E%A5%ED%95%A9%EB%8B%88%EB%8B%A4-%EC%B6%94%EC%83%81-%ED%92%8D%EA%B2%BD-%EB%B2%A1%ED%84%B0-%EB%8B%A4%EA%B0%81%ED%98%95-%ED%92%8D%EA%B2%BD-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%9D%B4%EC%85%98-%EB%AF%B8%EB%8B%88%EB%A9%80-%ED%95%9C-%EC%8A%A4%ED%83%80%EC%9D%BC-%ED%94%8C%EB%9E%AB-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%B0%9C%EA%B2%AC-%ED%83%90%EA%B5%AC%EC%9D%98-%EC%97%AC%ED%96%89-%EA%B0%9C%EB%85%90-%EC%96%B4%EB%93%9C%EB%B2%A4%EC%B2%98-%EA%B4%80%EA%B4%91.jpg?s=612x612&w=0&k=20&c=RRgxBfAIY3ZgLp3grXrn2-8KXV6ffVVDR-LURWUwpEQ=",
		"https://mblogthumb-phinf.pstatic.net/MjAyMDAyMjZfMjQx/MDAxNTgyNjgyMDI0OTY0.AuDxAj5GgIF3N15q3jG2tlOsMezf-Bqry-x1bL67_mIg.LAK9kFBVYq4bB6318BtYtTRRTEvM4mMVT5YwljQVUscg.JPEG.artlife/2507651_image_1.jpg?type=w800",
		"https://mblogthumb-phinf.pstatic.net/20121024_210/gjcityi_1351044070784MHAmL_JPEG/%B5%EE%BB%EA%C0%E5%BA%F1_4.jpg?type=w2",
	];

	return (
		<Carousel
			height="650px"
			autoPlay={true}
			showArrows={true}
			infiniteLoop={true}
			showStatus={false}
			showThumbs={false}
			showIndicators={true}
			interval={5000}
			swipeable={true}
			dynamicHeight={false}
		>
			<div className="relative h-full w-full">
				<img
					src={images[0]}
					alt="img1"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 grid h-full w-full place-items-center bg-black/70">
					<div className="w-3/4 text-center md:w-2/4">
						<p className="mb-4 font-bold text-2xl md:text-3xl lg:text-4xl text-white opacity-70">
							등산의 즐거움을 나누는 공간, <br></br>함께 모험을 시작하세요!
						</p>
						<p className="mb-5 opacity-80 text-white">
							올바른 준비와 안전한 등산을 위한 팁, <br></br>등산 커뮤니티에서
							배울 수 있습니다.
						</p>
						<div className="flex justify-center gap-2">
							{currentUser ? (
								<Link to="/club">
									<button className="text-black bg-teal-400 p-3 rounded-lg hover:bg-teal-600 hover:text-white">
										바로가기
									</button>
								</Link>
							) : (
								<Link to="/login">
									<button className="text-black bg-teal-400 p-3 rounded-lg hover:bg-teal-600 hover:text-white">
										산악 동호회
									</button>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="relative h-full w-full">
				<img
					src={images[1]}
					alt="img2"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 grid h-full w-full items-center bg-black/70">
					<div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
						<p className="mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-70">
							산으로 떠나는 모든 이들의 추억을 나누는 공간, <br></br> 다양한
							경치를 감상해보세요!
						</p>
						<p className="mb-5 text-white opacity-80">
							산행 길을 떠나 산들의 아름다운 경관을 공유해보세요.
						</p>
						<div className="flex gap-2">
							{currentUser ? (
								<Link to="/club">
									<button className="text-black bg-teal-400 p-3 rounded-lg hover:bg-teal-600 hover:text-white">
										바로가기
									</button>
								</Link>
							) : (
								<Link to="/login">
									<button className="text-black bg-teal-400 p-3 rounded-lg hover:bg-teal-600 hover:text-white">
										바로가기
									</button>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
			<div className="relative h-full w-full">
				<img
					src={images[2]}
					alt="image 3"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 grid h-full w-full items-end bg-black/70">
					<div className="w-3/4 pl-12 pb-12 md:w-2/4 md:pl-20 md:pb-20 lg:pl-32 lg:pb-32">
						<p className="mb-4 text-2xl md:text-3xl lg:text-4xl font-bold text-white opacity-70">
							산행의 순간을 함께 할 준비가 되셨나요? <br></br> 필요한 장비를
							챙기고 함께 떠나요!
						</p>
						<p className="mb-5 text-white opacity-80">
							등산을 즐기기 위한 제대로 된 장비가 있다면, 산을 오를 때 더 많은
							즐거움을 느낄 수 있습니다.
						</p>
						<div className="flex gap-2">
							{currentUser ? (
								<Link to="/club">
									<button className="text-black bg-teal-400 p-3 rounded-lg hover:bg-teal-600 hover:text-white">
										바로가기
									</button>
								</Link>
							) : (
								<Link to="/login">
									<button className="text-black bg-teal-400 p-3 rounded-lg hover:bg-teal-600 hover:text-white">
										바로가기
									</button>
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</Carousel>
	);
}
