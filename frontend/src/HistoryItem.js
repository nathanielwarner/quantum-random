class HistoryItem {
  constructor(dateTime, isHeads, headsAction, tailsAction) {
    this.dateTime = dateTime;
    this.isHeads = isHeads;
    this.headsAction = headsAction;
    this.tailsAction = tailsAction;
  }
}

export default HistoryItem;
