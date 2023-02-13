import { Services } from "../services/services";
export class CommentComponent {
    constructor(id, text, author, timestamp, avatar, votes, favourite) {
        this.id = id;
        this.text = text;
        this.author = author;
        this.timestamp = timestamp;
        this.avatar = avatar;
        this.votes = votes;
        this.favourite = favourite;
    }
    render() {
        const commentThread = document.querySelector(".comment-thread");
        const content = `
      <li class="thread__item thread-item_layout">
      <div class="avatar">
        <img
          class="avatar-image"
          src="../public/assets/content-images/samsung-memory-hjRC0i0oJxg-unsplash 1avatar-pic.png"
          alt="Avatar"
        />
      </div>
      <div class="comment-info-container">
        <h4 class="username">John Doe</h4>
        <time datetime="13:55 01-15" class="timestamp"
          >15.01 13:55</time
        >
      </div>
      <p class="comment-body">
      </p>
      <div class="action-bar">
        <button class="btn-reply button-style-default o-text-18-op-4">
          <img
            class="button-icon"
            src="../public/assets/interface-images/icon-reply.svg"
            alt="reply"
          />
          Ответить
        </button>
        <button
          class="btn-favourite button-style-default o-text-18-op-4"
          id="btn-fav"
        >
          <img
            class="button-icon"
            src="../public/assets/interface-images/icon-saved.svg"
            alt="add to favourite"
          />
          В избранное
        </button>
        <div class="comment-rating">
          <button
            class="btn-rating__icon_downvote button-style-default"
            id="downvote"
          >
            <img
              src="../public/assets/interface-images/icon-downvote.svg"
              alt="vote down"
            />
          </button>
          <div class="btn-rating__count o-text-18-op-4">0</div>
          <button
            class="btn-rating__icon_upvote button-style-default"
            id="upvote"
          >
            <img
              src="../public/assets/interface-images/icon-upvote.svg"
              alt="vote up"
            />
          </button>
        </div>
      </div>
    <ul class="replies">
      <li class="reply thread-item_layout">
        <div class="avatar">
          <img
            class="avatar-image"
            src="../public/assets/content-images/samsung-memory-hjRC0i0oJxg-unsplash 1avatar-pic.png"
            alt="Avatar"
          />
        </div>
        <div class="comment-info-container">
          <h4 class="username">John Doe</h4>
          <div class="replied-user-info o-text-18-op-4">
            <img class="replied-user-info__icon" src="../public/assets/interface-images/icon-reply.svg" alt="Replied to">
            <div class="replied-user-info__text">Алексей_1994b</div>
          </div>
          <time datetime="13:55 01-15" class="timestamp"
            >15.01 13:55</time
          >
        </div>
          <p class="comment-body">
          </p>
          <div class="action-bar">
            <button
              class="btn-favourite button-style-default o-text-18-op-4"
              id="btn-fav"
            >
              <img
                class="button-icon"
                src="../public/assets/interface-images/icon-saved.svg"
                alt="reply"
              />
              В избранное
            </button>
            <div class="comment-rating">
              <button
                class="btn-rating__icon_downvote button-style-default"
                id="downvote"
              >
                <img
                  src="../public/assets/interface-images/icon-downvote.svg"
                  alt="vote down"
                />
              </button>
              <div class="btn-rating__count o-text-18-op-4">0</div>
              <button
                class="btn-rating__icon_upvote button-style-default"
                id="upvote"
              >
                <img
                  src="../public/assets/interface-images/icon-upvote.svg"
                  alt="vote up"
                />
              </button>
            </div>
          </div>
      </li>
    </ul>
  </li>
      `;
        Services.render(commentThread, content);
    }
    reply() { }
    /**
     * voteCount
     */
    voteCount() {
    }
    addToFavorite() {
    }
}
