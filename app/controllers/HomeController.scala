package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import dog._
import dog.controller.StateComponent.InputCardMaster
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
  
  def selectCardAndPiece(cardNum: Int, cardOption: Int, pieceNum: Int) = Action {
    val fieldPos = gameController.gameState.actualPlayer.piece(pieceNum).pos
            gameController.selectedField(fieldPos)
            gameController.manageRound(InputCardMaster.UpdateCardInput()
              .withCardNum((cardNum, cardOption))
              .withSelectedCard(gameController.actualPlayedCard(cardNum))
              .buildCardInput())
    Ok(views.html.initGame(gameController))
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
}
