import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Компонент отображает текущей прогресс скролла
 */
class ScrollProgress extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      progress: 0,
    };

    this.updateProgress = this.updateProgress.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Обновляем прогресс если страница сменилась
    if (this.props.location !== prevProps.location) {
      this.updateProgress();
    }
  }

  componentDidMount() {
    this.updateProgress();

    window.addEventListener("scroll", this.updateProgress);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateProgress);
  }

  updateProgress() {
    // Максимальная позиция до которой можно доскроллить
    const maxScrollY = document.body.scrollHeight - window.innerHeight;
    // Прогресс скролла от 0 до 1
    const progress = window.pageYOffset / maxScrollY;
    // Обрабатываем случай когда текущая и максимальная позиция скролла равны 0
    const safeProgress = isNaN(progress) ? 0 : progress;

    this.setState(() => ({
      progress: safeProgress,
    }));
  }

  render() {
    return (
      <div
        style={{
          backgroundSize: this.state.progress * 100 + "%",
        }}
        className="scroll-progress"
      />
    );
  }
}

export default withRouter(ScrollProgress);
