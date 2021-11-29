package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import dog._
import dog.controller.StateComponent.InputCardMaster
import play.api.libs.json.{JsNumber, JsObject, Json, JsValue}

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  var gameController = Dog.controller

  var playerNames = List("Player1","Player2","Player3","Player4")
    gameController.initGame(playerNames, 4, 6, 20)
  
  def printDog() = gameController.toStringBoard + "/n" + gameController.toStringGarage + "/n" + gameController.toStringPlayerHands + "/n" + gameController.lastMessage

  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def about: Action[AnyContent] = Action {
    Ok(views.html.about())
  }

  def initGame: Action[AnyContent] = Action {
    Ok(views.html.initGame(gameController))
  }

  def newGame(amountPieces: Int, amountCards: Int, sizeBoard: Int) = Action {
    var playerNames = List("P1","P2","P3","P4")
    gameController.initGame(playerNames, amountPieces, amountCards, sizeBoard)
    Ok(views.html.initGame(gameController))
  }
  
  def isOwnPiece(fieldIdx: String) = Action {
    var result = false;
    var jsonResultString: String = "";
    gameController.gameState.board.cell(fieldIdx.toInt).p match { 
      case Some(p)=> { 
          result = (p.nameAndIdx._1 == gameController.gameState.actualPlayer.nameAndIdx._1)

          var pieceIdx = p.getPieceNum(fieldIdx.toInt);
          if (result) {
            jsonResultString = "true " + pieceIdx + " " + p.nameAndIdx._2
          } else {
            jsonResultString = "false " + pieceIdx + " " + p.nameAndIdx._2
          }
      }
      case None => {
          jsonResultString = "none"
      }
   
  }
     Ok(Json.obj(
        "isOwnPiece" -> jsonResultString
      ))
}
  def selectCardWithOption(cardNum: Int, cardOption: Int) = Action {
    gameController.manageRound(InputCardMaster.UpdateCardInput()
              .withCardNum((cardNum, cardOption))
              .withSelectedCard(gameController.actualPlayedCard(cardNum))
              .buildCardInput())
    Ok(views.html.initGame(gameController))
    }

  def selectSwap(cardNum: Int, otherPlayer: Int, pieceNum1: Int, pieceNum2: Int) = Action {
    val fieldPosOwn = gameController.gameState.actualPlayer.piece(pieceNum1).pos
            val fieldPosOther = gameController.gameState.players._1(otherPlayer).piece(pieceNum2).pos
            gameController.selectedField(fieldPosOwn)
            gameController.selectedField(fieldPosOther)
            gameController.manageRound(InputCardMaster.UpdateCardInput()
              .withOtherPlayer(otherPlayer)
              .withCardNum((cardNum, 0))
              .withSelectedCard(gameController.actualPlayedCard(cardNum))
              .buildCardInput())
    Ok(views.html.initGame(gameController))
    }
    
  def selectCard(cardNum: Int) = Action {
    gameController.manageRound(InputCardMaster.UpdateCardInput()
              .withCardNum((cardNum, 2))
              .withSelectedCard(gameController.actualPlayedCard(cardNum))
              .buildCardInput())
    Ok(views.html.initGame(gameController))
    }
  
  def selectCardAndPiece: Action[JsValue] = Action(parse.json) {
    setRequest: Request[JsValue] => {
      val cardNum = (setRequest.body \ "cardNum").as[String]
      val cardOption = (setRequest.body \ "cardOption").as[String]
      val pieceNum = (setRequest.body \ "pieceNum").as[Int]
      val fieldPos = gameController.gameState.actualPlayer.piece(pieceNum.toInt).pos
      gameController.selectedField(fieldPos)
      gameController.manageRound(InputCardMaster.UpdateCardInput()
        .withCardNum((cardNum.toInt, cardOption.toInt))
        .withSelectedCard(gameController.actualPlayedCard(cardNum.toInt))
        .buildCardInput())
      Ok(boardToJson)
    }
  }

  def printBoard() = Action {
    Ok(printDog())
  }

  def load() = Action {
    gameController.load
    Ok("load /n" + printDog())
  }

  def save() = Action {
    gameController.save()
    Ok("load /n" + printDog())
  }

  def undo() = Action {
    gameController.undoCommand()
    Ok(views.html.initGame(gameController))
  }

  def redo() = Action {
    gameController.redoCommand()
    Ok(views.html.initGame(gameController))
  }

  def playerhands() = Action {
    Ok("playerhands" + gameController.toStringPlayerHands)
  }

  def createPlayers(name1: String, name2: String, name3: String, name4: String, amountPieces: Int, amountCards: Int) = Action {
    Ok("createNewBoard" + gameController.createPlayers(List(name1,name2,name3,name4), amountPieces, amountCards))
  }

  def getJsonBoard: Action[AnyContent] = Action {
    Ok(boardToJson)
  }

  def boardToJson: JsObject = {
    Json.obj(
      // board data
      "boardSize" -> JsNumber(gameController.gameState.board.size),

      // player data
      "playerNumber" -> JsNumber(gameController.gameStateMaster.pieceAmount),
      "currentPlayer" -> JsNumber(gameController.gameState.actualPlayer.nameAndIdx._2),
      "players" -> Json.toJson(
        for {
          idx <- 0 until gameController.gameStateMaster.playerNames.size,
        } yield {
          Json.obj(
            "player index" -> JsNumber(idx),
            "name" -> gameController.gameStateMaster.playerNames(idx),
            "color" -> gameController.gameStateMaster.colors(idx),
            "homePosition" -> JsNumber(gameController.gameStateMaster.playerVector(idx).homePosition),
            "pieces" -> Json.toJson(
              for {
                piece_idx <- 0 until gameController.gameStateMaster.pieceAmount,
              } yield {
                Json.obj(
                  "piece_idx" -> JsNumber(piece_idx),
                  "piece_pos" -> JsNumber(gameController.gameStateMaster.playerVector(idx).piecePosition(piece_idx))
                )
              }
            ),
            "garage" -> Json.toJson(
              for {
                garage_idx <- 0 until gameController.gameStateMaster.playerVector(idx).garage.size
              } yield {
                Json.obj(
                  "garage_idx" -> JsNumber(garage_idx),
                  "garage_piece" -> JsNumber(gameController.gameStateMaster.playerVector(idx).garage.getPieceIndex(garage_idx))
                )
              }
            ),
            "house" -> Json.toJson(
              for {
                house_idx <- 0 until gameController.gameStateMaster.playerVector(idx).inHouse.length
              } yield {
                Json.obj(
                  "inHouse" -> JsNumber(gameController.gameStateMaster.playerVector(idx).inHouse(house_idx))
                )
              }
            ),
            "cards" -> Json.toJson(
              for {
                card_idx <- 0 until gameController.gameStateMaster.playerVector(idx).cardList.length
              } yield {
                Json.obj(
                  "card_symbol" -> gameController.gameStateMaster.playerVector(idx).cardList(card_idx).symbol
                )
              }
            )
          )
        }
      )
    )
  }
}
