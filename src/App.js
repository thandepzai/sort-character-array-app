import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  font-size: 14px;
  font-family: 'Times New Roman', Times, serif;
  color: #008B8B;
  font-weight: bold;
`;

const EnumerateCharactersContainer = styled.div``;

const EnumerateCharactersTitle = styled.div`
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
`;

const EnumerateCharactersList = styled.div`
  margin-bottom: 20px;
`;

const Character = styled.span``;

const SortButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const SortButton = styled.button`
  background-color: #008B8B;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.1s ease-in-out;
  &:hover {
    transform: scale(103%);
  }
`;

const SortCharactersList = styled.div``;
const RunTime = styled.div`
  margin-bottom: 20px;
  font-size: 20px;
`;
const SortingResult = styled.div`
  margin-bottom: 10px;
  font-size: 20px;
`;

function App() {
  const [array, setArray] = useState([]);
  const [sortedArrays, setSortedArrays] = useState([]);
  const [executionTimes, setExecutionTimes] = useState(0);

  useEffect(() => {
    const generateRandomCharacter = () => {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const randomIndex = Math.floor(Math.random() * characters.length);
      return characters.charAt(randomIndex);
    };

    const newArray = [];
    for (let i = 0; i < 1000; i++) {
      const randomLength = Math.floor(Math.random() * 5) + 1;
      let randomString = '';
      for (let j = 0; j < randomLength; j++) {
        randomString += generateRandomCharacter();
      }
      newArray.push(randomString);
    }
    setArray(newArray);
  }, []);

  function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
      let currentElement = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > currentElement) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = currentElement;
    }
    return arr;
  }

  function selectionSort(arr) {

    for (let i = 0; i < arr.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
      }
    }
    return arr;
  }

  function bubbleSort(arr) {

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }

  function mergeSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
  
    const merge = (left, right) => {
      let result = [];
      let leftIndex = 0;
      let rightIndex = 0;
  
      while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
          result.push(left[leftIndex]);
          leftIndex++;
        } else {
          result.push(right[rightIndex]);
          rightIndex++;
        }
      }
  
      return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    };
  
    return merge(mergeSort(left), mergeSort(right));
  }
  
  function quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }
  
    const pivot = arr[0];
    const left = [];
    const right = [];
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
  
    return [...quickSort(left), pivot, ...quickSort(right)];
  }

  function handleSort(sortType) {
    let sortedArray;
    const startTime = performance.now();
    switch (sortType) {
      case 1:
        sortedArray = insertionSort([...array]);
        break;
      case 2:
        sortedArray = selectionSort([...array]);
        break;
      case 3:
        sortedArray = bubbleSort([...array]);
        break;
      case 4:
        sortedArray = mergeSort([...array]);
        break;
      case 5:
        sortedArray = quickSort([...array]);
        break;
      default:
        console.log('Invalid sorting type');
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    setSortedArrays(sortedArray);
    setExecutionTimes(executionTime);
  }

  const RenderListArrraySorted = useCallback(() => {
    return (sortedArrays.length !== 0 && (
      <SortCharactersList>
        <RunTime>Tổng thời gian: {executionTimes.toFixed(2)} ms</RunTime>
        <SortingResult>Kết quả sắp xếp:</SortingResult>
        [{sortedArrays.map((char, index) => (
          <Character key={index}>
            {index > 0 ? ', ' : ''}
            '{char}'
          </Character>
        ))}]
      </SortCharactersList>
    ));
  }, [sortedArrays, executionTimes]);

  return (
    <StyledDiv>
      <EnumerateCharactersContainer>
        <EnumerateCharactersTitle>
          Danh sách các ký tự:
        </EnumerateCharactersTitle>
        <EnumerateCharactersList>
          [{array.map((char, index) => (
            <Character key={index}>
              {index > 0 ? ', ' : ''}
              '{char}'
            </Character>
          ))}]
        </EnumerateCharactersList>
      </EnumerateCharactersContainer>

      <SortButtonContainer>
        <SortButton onClick={() => handleSort(1)}>Sắp xếp chèn</SortButton>
        <SortButton onClick={() => handleSort(2)}>Sắp xếp chọn</SortButton>
        <SortButton onClick={() => handleSort(3)}>Sắp xếp nổi bọt</SortButton>
        <SortButton onClick={() => handleSort(4)}>Sắp xếp trộn</SortButton>
        <SortButton onClick={() => handleSort(5)}>Sắp xếp nhanh</SortButton>
      </SortButtonContainer>
      <RenderListArrraySorted />
    </StyledDiv>
  );
}

export default App;
