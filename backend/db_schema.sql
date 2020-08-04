CREATE TABLE Users (
  ID BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  Name VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  PRIMARY KEY (ID)
);

CREATE TABLE CoinFlipHistory (
  ID BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  UserID BIGINT UNSIGNED NOT NULL,
  DateTime BIGINT NOT NULL,
  Outcome ENUM('Heads', 'Tails') NOT NULL,
  HeadsAction VARCHAR(255),
  TailsAction VARCHAR(255),
  PRIMARY KEY (ID),
  FOREIGN KEY (UserID) REFERENCES Users(ID)
);