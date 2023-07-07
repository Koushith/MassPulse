import styled from "styled-components";
import { TABLET } from "../../utils";

export const SuggestionsPageContainer = styled.div`
  display: flex;

  justify-content: space-between;

  padding: 0 2rem;
  margin-top: 4rem;
  .actions {
    min-width: 600px;
    .user {
      font-size: 1.8rem;
      font-weight: 600;
      margin-bottom: 2rem;
    }

    .form {
      max-width: 50rem;
      input {
        display: block;
        padding: 1rem 2rem 1rem 1rem;
        width: 100%;
        margin-bottom: 1rem;
      }

      .insight-btn {
        width: 100%;
      }
    }

    .history {
      margin-top: 4rem;
      h2 {
        font-size: 1.8rem;
        font-weight: 600;
        margin-bottom: 2rem;
      }
    }
  }

  .response {
    .suggestion-title {
      font-size: 1.6rem;
      margin: 2rem 0;
    }
    .results {
      background-color: #242424;
      padding: 2rem 4rem;

      ul {
        li {
          font-size: 1.4rem;
          line-height: 20px;
          margin-bottom: 2rem;
        }
      }
    }
  }

  .no-results {
    img {
      width: 100%;
      border-radius: 50%;
    }

    p {
      text-align: center;
      font-size: 1.4rem;
      margin-top: 2rem;
      font-weight: 600;
    }

    .loader-text {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      margin-top: 2rem;
      font-size: 1.4rem;
      font-weight: 600;
    }
  }

  @media (${TABLET}) {
    // Styles for tablets (if needed)
    flex-direction: column;

    .actions {
      min-width: 100%;
    }
  }
`;

export const HistoryCard = styled.div`
  border: 1px solid rgb(115, 114, 115);
  margin-bottom: 1rem;
  padding: 2rem;
  max-width: 50rem;
  overflow: hidden;
  .title {
    font-size: 1.4rem;
    font-weight: 600;
  }

  .link {
    font-weight: 400;
    color: #eee;
    font-size: 1.4rem;
    margin-top: 1rem;
    text-overflow: ellipsis;
  }
`;
