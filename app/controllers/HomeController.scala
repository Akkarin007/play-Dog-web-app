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

  def selectCard(cardNum: Int, cardOption: Int) = Action {
    gameController.manageRound(InputCardMaster.UpdateCardInput()
              .withCardNum((cardNum, cardOption))
              .withSelectedCard(gameController.actualPlayedCard(cardNum))
              .buildCardInput())
      Ok(printDog())
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

  def undoCommand() = Action {
    gameController.undoCommand()
    Ok("undo /n" + printDog())
  }

  def redoCommand() = Action {
    gameController.redoCommand()
    Ok("redo /n" + printDog())
  }

  def playerhands() = Action {
    Ok("playerhands" + gameController.toStringPlayerHands)
  }

  def createPlayers(name1: String, name2: String, name3: String, name4: String, amountPieces: Int, amountCards: Int) = Action {
    Ok("createNewBoard" + gameController.createPlayers(List(name1,name2,name3,name4), amountPieces, amountCards))
  }
}
