import useFetch from "../../hooks/useFetch";
import "./featured.css";
import DaNangImage from "../../data/CityImage/DaNang.jpg";
import HaNoiImage from "../../data/CityImage/HaNoi.jpg";
import HCMImage from "../../data/CityImage/HCM.jpg";
const Featured = () => {
  const { data, loading } = useFetch(
    "http://localhost:8800/hotel/countByCity?cities=Ha Noi,Da Nang,Ho Chi Minh"
  );
  return (
    <div className="featured">
      {loading ? (
        "Loding please wait..."
      ) : (
        <>
          <div className="featuredItem">
            <img src={HaNoiImage} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Hà Nội</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img src={DaNangImage} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Đà Nẵng</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img src={HCMImage} alt="" className="featuredImg" />
            <div className="featuredTitles">
              <h1>Hồ Chí Minh</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
