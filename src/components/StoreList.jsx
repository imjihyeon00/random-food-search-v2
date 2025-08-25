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
      <ImageMessage
        src={EmptyListImage}
        text={`앗!! 주변에 ${chip} 음식점이 없어요!!`}
      />
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