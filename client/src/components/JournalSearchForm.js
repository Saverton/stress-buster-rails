import React from 'react';
import styled from 'styled-components';

const SearchForm = styled.form`
  background-color: var(--seafoam-green);
  margin: 0.5rem 0;
  padding: 1rem;
  border-radius: 25px;
  flex-basis: 90%;
  justify-content: space-evenly;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const Fieldset = styled.fieldset`
  background-color: var(--cyan);
  border: none;
  border-radius: 10px;
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 5px;
`;

function JournalSearchForm({ searchParams, setSearchParams }) {
  const { searchTerm, sort, filter } = searchParams;

  const onChange = e => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  return (
    <SearchForm className="flex row">
      <Fieldset>
        <label htmlFor="searchTerm">Search : </label>
        <SearchInput
          type="text"
          name="searchTerm"
          id="searchTerm"
          placeholder="Search by quote, journal entry, or date..."
          value={searchTerm}
          onChange={onChange}
        />
      </Fieldset>
      <Fieldset>
        <label htmlFor="sort">Sort By : </label>
        <SearchInput
          as="select"
          name="sort"
          id="sort"
          value={sort}
          onChange={onChange}
        >
          <option value="date">Date</option>
          <option value="sleep">Sleep Time</option>
          <option value="exercise">Exercise Time</option>
          <option value="nature">Time in Nature</option>
          <option value="social">Social Interactions</option>
          <option value="mindful">Mindfulness</option>
          <option value="nutrition">Nutrition</option>
          <option value="mental">Media Consumption</option>
        </SearchInput>
      </Fieldset>
      <Fieldset>
        <label htmlFor="filter">Filter By : </label>
        <SearchInput
          as="select"
          name="filter"
          id="filter"
          value={filter}
          onChange={onChange}
        >
          <option value="all">No Filter</option>
          <option value={false}>Did not Attend Therapy</option>
          <option value={true}>Attended Therapy</option>
        </SearchInput>
      </Fieldset>
    </SearchForm>
  );
}

export default JournalSearchForm;