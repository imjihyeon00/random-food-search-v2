import styled from 'styled-components';
import EmptyListImage from '../assets/empty_list.svg'; 


export default function StoreList({results, chip, onItemClick}) {
  return (
    <>
      {results.length > 0 ?
        <ReasultList className="searchList">
          {results.map((list, idx)=>(
            <ReasultItem key={idx} onClick={()=>{onItemClick(list)}}>
              <div className="title">
                <h2>{list.place_name}</h2>
                <span>{list.category_name.split(">").map(c => c.trim()).pop()}</span>
              </div>
              <p>{list.road_address_name}</p>
              <p>{list.phone}</p>
            </ReasultItem>
          ))}
        </ReasultList>
      : 
      <EmptyBox>
        <img src={EmptyListImage} alt="주변에 음식점이 없어요!!" />
        <p>앗!! 주변에 {chip} 음식점이 없어요!!</p>
      </EmptyBox>
      }
    </>
  )
  
};


const ReasultList = styled.ul`
  display: flex;
  gap: 6px;
  flex-direction: column;

`;
const ReasultItem = styled.li`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px; 

  .title {
    display: flex;
    align-items: center;
    font-size: 1rem;
    gap: 8px;

    h2 {
      font-weight: 700;
    }
    span {
      font-size: 0.75em;
    }
  }
`;
const EmptyBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 70px 0;

  img {
    width: 100%;
    max-width: 300px;
    height: auto;
  }

  p {
    text-align: center;
    font-size: 1rem;
    color: #666;
  }
`;