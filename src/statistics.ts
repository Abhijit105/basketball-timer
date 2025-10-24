// score elements
const teamHomeScoreEl = document.getElementById("team-home-score");
const teamGuestScoreEl = document.getElementById("team-guest-score");
const teamHomeFoulsCountEl = document.getElementById("team-home-fouls-count");
const teamGuestFoulsCountEl = document.getElementById("team-guest-fouls-count");
const winnerHomeEl = document.getElementById("winner-home");
const winnerGuestEl = document.getElementById("winner-guest");

function setupStatistics(): {
  getScoreHome: () => number | undefined;
  getScoreGuest: () => number | undefined;
  setScoreHome: (
    callback?: ((previous: number | undefined) => number) | number,
  ) => void;
  setScoreGuest: (
    callback?: ((previous: number | undefined) => number) | number,
  ) => void;
  getFoulsHome: () => number | undefined;
  getFoulsGuest: () => number | undefined;
  setFoulsHome: (
    callback?: ((previous: number | undefined) => number) | number,
  ) => void;
  setFoulsGuest: (
    callback?: ((previous: number | undefined) => number) | number,
  ) => void;
  incrementScoreHome: (increaseBy: number) => void;
  incrementScoreGuest: (increaseBy: number) => void;
  incrementFoulsHome: () => void;
  decrementFoulsHome: () => void;
  incrementFoulsGuest: () => void;
  decrementFoulsGuest: () => void;
} {
  let scoreHome: number | undefined;
  let scoreGuest: number | undefined;
  let foulsHome: number | undefined;
  let foulsGuest: number | undefined;

  function getScoreHome(): number | undefined {
    return scoreHome;
  }

  function getScoreGuest(): number | undefined {
    return scoreGuest;
  }

  function getFoulsHome(): number | undefined {
    return foulsHome;
  }

  function getFoulsGuest(): number | undefined {
    return foulsGuest;
  }

  function setScoreHome(
    callback?: ((previous: number | undefined) => number) | number,
  ): void {
    if (typeof callback === "number" || typeof callback === "undefined") {
      scoreHome = callback;
    } else if (typeof callback === "function") {
      scoreHome = callback(scoreHome);
    }
    let scoreH = getScoreHome();
    let scoreG = getScoreGuest();
    teamHomeScoreEl!.textContent =
      scoreH !== undefined ? scoreH.toString() : "_";

    scoreH = scoreH ? scoreH : 0;
    scoreG = scoreG ? scoreG : 0;
    if (scoreH > scoreG) {
      winnerHomeEl!.textContent = "🎖️";
      winnerGuestEl!.textContent = "";
    } else if (scoreH < scoreG) {
      winnerGuestEl!.textContent = "🎖️";
      winnerHomeEl!.textContent = "";
    }
  }

  function setScoreGuest(
    callback?: ((previous: number | undefined) => number) | number,
  ): void {
    if (typeof callback === "number" || typeof callback === "undefined") {
      scoreGuest = callback;
    } else if (typeof callback === "function") {
      scoreGuest = callback(scoreGuest);
    }
    let scoreG = getScoreGuest();
    let scoreH = getScoreHome();
    teamGuestScoreEl!.textContent =
      scoreG !== undefined ? scoreG.toString() : "_";

    scoreG = scoreG ? scoreG : 0;
    scoreH = scoreH ? scoreH : 0;
    if (scoreH > scoreG) {
      winnerHomeEl!.textContent = "🎖️";
      winnerGuestEl!.textContent = "";
    } else if (scoreH < scoreG) {
      winnerGuestEl!.textContent = "🎖️";
      winnerHomeEl!.textContent = "";
    }
  }

  function setFoulsHome(
    callback?: ((previous: number | undefined) => number) | number,
  ): void {
    if (typeof callback === "number" || typeof callback === "undefined") {
      foulsHome = callback;
    } else if (typeof callback === "function") {
      foulsHome = callback(foulsHome);
    }
    const fouls = getFoulsHome();
    teamHomeFoulsCountEl!.textContent =
      fouls !== undefined ? fouls.toString() : "";
  }

  function setFoulsGuest(
    callback?: ((previous: number | undefined) => number) | number,
  ): void {
    if (typeof callback === "number" || typeof callback === "undefined") {
      foulsGuest = callback;
    } else if (typeof callback === "function") {
      foulsGuest = callback(foulsGuest);
    }
    const fouls = getFoulsGuest();
    teamGuestFoulsCountEl!.textContent =
      fouls !== undefined ? fouls.toString() : "";
  }

  function incrementScoreHome(increaseBy: number): void {
    if (scoreHome === undefined || !increaseBy) {
      return;
    }
    setScoreHome((previous: number | undefined): number => {
      if (previous === undefined) {
        return 0;
      }

      return previous + increaseBy;
    });
  }

  function incrementScoreGuest(increaseBy: number): void {
    if (scoreGuest === undefined || !increaseBy) {
      return;
    }

    setScoreGuest((previous: number | undefined): number => {
      if (previous === undefined) {
        return 0;
      }

      return previous + increaseBy;
    });
  }

  function incrementFoulsHome(): void {
    if (foulsHome === undefined) {
      return;
    }

    setFoulsHome((previous: number | undefined): number => {
      if (previous === undefined) {
        return 0;
      }

      return previous + 1;
    });
  }

  function decrementFoulsHome(): void {
    if (!foulsHome) {
      return;
    }

    setFoulsHome((previous: number | undefined): number => {
      if (previous === undefined) {
        return 0;
      }

      return previous - 1;
    });
  }

  function incrementFoulsGuest(): void {
    if (foulsGuest === undefined) {
      return;
    }

    setFoulsGuest((previous: number | undefined): number => {
      if (previous === undefined) {
        return 0;
      }

      return previous + 1;
    });
  }

  function decrementFoulsGuest(): void {
    if (!foulsGuest) {
      return;
    }

    setFoulsGuest((previous: number | undefined): number => {
      if (previous === undefined) {
        return 0;
      }

      return previous - 1;
    });
  }

  return {
    getScoreHome,
    getScoreGuest,
    setScoreHome,
    setScoreGuest,
    getFoulsHome,
    getFoulsGuest,
    setFoulsHome,
    setFoulsGuest,
    incrementScoreHome,
    incrementScoreGuest,
    incrementFoulsHome,
    decrementFoulsHome,
    incrementFoulsGuest,
    decrementFoulsGuest,
  };
}

const Statistics = setupStatistics();

export default Statistics;
