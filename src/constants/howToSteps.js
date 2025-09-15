import capHome from "../assets/howto/home.png";
import capFilter from "../assets/howto/filter.gif";
import capSearch from "../assets/howto/search.png";
import capSearchMove from "../assets/howto/search_move.gif";
import capList from "../assets/howto/list.png";
import capListPopup from "../assets/howto/list_popup.png";

export const HOWTO_STEPS = [
    {
      id: "start",
      title: "시작하기",
      desc:
        "접속하면 현재 위치 기반 지도가 보입니다. 위치 권한을 허용하면 더 정확한 추천이 가능합니다. 현재 위치를 가져올 수 없거나 위치가 다르다면 원하는 곳을 눌러 중심 위치를 변경할 수 있습니다.",
      images: [{ src: capHome, alt: "홈 초기 화면" }],
    },
    {
      id: "filter",
      title: "필터 선택",
      desc:
        "상단 필터(한식, 일식, 양식, 분식 등)를 선택해 원하는 카테고리를 검색할 수 있습니다. ‘전체’를 선택하면 근처의 모든 음식점이 대상이 됩니다.",
      images: [{ src: capFilter, alt: "필터 선택" }],
    },
    {
      id: "search",
      title: "검색 실행",
      desc:
        "'검색'버튼을 누르면 현재 선택한 좌표를 기준으로 근처 음식점을 검색합니다.",
      images: [{ src: capSearch, alt: "검색 실행" }, { src: capSearchMove, alt: "검색 후 지도 이동" }],
    },
    {
      id: "results",
      title: "결과 확인",
      desc:
        "검색 결과가 리스트로 나타나고, 지도에는 해당 위치에 마커가 표시됩니다. 그 중 랜덤한 한곳의 음식점을 팝업으로 추천드립니다. 만약 결과가 없으면 다른 필터로 다시 시도해 보세요!",
      images: [{ src: capList, alt: "검색 결과 리스트" }],
    },
    {
      id: "detail",
      title: "상세/길찾기",
      desc:
        "리스트 아이템을 누르면 팝업이 열리고, 미리보기 지도와 함께 카카오 맵으로 이동할 수 있습니다.",
      images: [{ src: capListPopup, alt: "상세 팝업" }],
    },
  ];