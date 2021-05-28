//
//  SearchOptionsViewController.swift
//  Maps
//
//  Created by João Saraiva on 17/05/2021.
//  Copyright © 2021 scenee. All rights reserved.
//

import UIKit

class SearchOptionsViewController: UITableViewController {
    
    // Options
    @IBOutlet weak var seatsLabel: UILabel!
    var seatsValue: Int = 1
    @IBAction func stepper(_ sender: UIStepper) {
        seatsValue = Int(sender.value)
        seatsLabel.text = "\(seatsValue)"
    }
    @IBOutlet weak var individualOption: UISwitch!
    @IBOutlet weak var booksOption: UISwitch!
    @IBOutlet weak var computersOption: UISwitch!
    @IBOutlet weak var printersOption: UISwitch!
    @IBOutlet weak var groupOption: UISwitch!
    @IBOutlet weak var eatOption: UISwitch!
    @IBOutlet weak var maxOccupation: UISlider!
    @IBOutlet weak var gpsOption: UISwitch!
    @IBOutlet weak var search: UIButton!
    

    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        self.clearsSelectionOnViewWillAppear = false
        
        // Round corners
        seatsLabel.layer.cornerRadius = 7;
        seatsLabel.layer.masksToBounds = true;
        search.layer.cornerRadius = 10;
        search.layer.masksToBounds = true;
        
        // Max occupation default
        maxOccupation.value = 100
    }
    
    // MARK: - Search logic
    
    private func submitSearch() {
        
        var area: String = "any"
        
        if gpsOption.isOn {
            // TODO: implement mapping location -> campus area
            // change area variable
        }
        
        let package = [
            "seats": seatsValue,
            "individual": individualOption.isOn,
            "books": booksOption.isOn,
            "computers": computersOption.isOn,
            "printers": printersOption.isOn,
            "group": groupOption.isOn,
            "eat": eatOption.isOn,
            "area": area,
            "maxOccupation": maxOccupation.value
        ] as [String : Any]
        
        // TODO: do http request
    }
    
    
    @IBAction func search(_ sender: Any) {
        
        // do request
        
        // receive an answer
        
        performSegue(withIdentifier: "presentSearchResults", sender: self)
    }
    
    

    // MARK: - Table view data source

    override func numberOfSections(in tableView: UITableView) -> Int {
        return 3
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        // #warning Incomplete implementation, return the number of rows
        if section == 0 {
            return 7
        }
        if section == 1 {
            return 3
        }
        if section == 2 {
            return 1
        }
        return 0
    }

    /*
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "reuseIdentifier", for: indexPath)

        // Configure the cell...

        return cell
    }
    */

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}



class SearchResults: UIViewController, UITableViewDataSource, UITableViewDelegate {
    
    var receivedResults:Dictionary<String,Dictionary<String, Int>> = [:]  // < building, <room, freeSpots> >
    var sectionsToBuildings:Dictionary<Int,String> = [:]
    var rowsToRooms:Dictionary<String, Dictionary<Int,String>> = [:]
    
    var selectedRoom:String = ""
    
    @IBOutlet weak var numberResultsLabel: UILabel!
    
    @IBAction func closeReultsView(_ sender: Any) {
        dismiss(animated: true, completion: nil)
    }
    
    @IBOutlet weak var resultsTable: UITableView!
    
    override func viewDidLoad() {
        
        resultsTable.dataSource = self
        resultsTable.delegate = self
        
        // TODO: unwrap receivedResults, if necessary
        
        // Example
        receivedResults = [
            "Pavilhão de Matemática e Física":
            [
                "Sala dos Alunos de Biomédica": 5,
                "Sala dos Alunos de Matemática": 3,
                "Sala de Dúvidas de Matemática": 1
            ],
            "Pavilhão Central":
            [
                "Biblioteca Central": 7
            ],
            "Pavilhão de Civil":
            [
                "Aquaário": 3,
                "Biblioteca do DEC": 12,
                "LTI do DEC": 16,
                "Sala 0.03": 2
            ],
            "Torre Norte e Pav. de Eletrecidade":
            [
                "Biblioteca do DEEC": 6,
                "Sala de Computadores do DEEC": 7,
                "Sala dos Alunos de Eletrotécnia": 5
            ]
        ]
        
        var n_results:Int = 0
        
        var b_counter = 0
        var r_counter = 0
        for b in receivedResults.keys {
            r_counter = 0
            sectionsToBuildings[b_counter] = b
            b_counter += 1
            rowsToRooms[b] = [:]
            for r in receivedResults[b]!.keys {
                rowsToRooms[b]![r_counter] = r
                r_counter += 1
                n_results += 1
            }
        }
        
        // Write number of results
        numberResultsLabel.text = "Encontrámos " + String(n_results) + " salas perto de si"
        
    }
    

    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        let b:String = self.sectionsToBuildings[section]!
        return self.receivedResults[b]!.count
    }
    
    func numberOfSections(in tableView: UITableView) -> Int {
        return self.receivedResults.count
    }
    
    // metodo para adicionar secção
    func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return self.sectionsToBuildings[section]
    }
    
    // metodo para adicionar celcula
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let reusablecell = tableView.dequeueReusableCell(withIdentifier: "resultCell", for: indexPath)
        let b:String = self.sectionsToBuildings[indexPath.section]!
        let r:String = self.rowsToRooms[b]![indexPath.row]!
        print("Found 1 result -- Building:", b, "; Room:", r)
        
        let cell = reusablecell as! ResultCell
        let freeSpots = self.receivedResults[b]![r]
        print("Personalizing...", self.receivedResults[b]![r] ?? "error")
        cell.setRoomName(name: r)
        cell.setFreeSpots(freeSpots: freeSpots!)
        return cell
    }
    
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if segue.destination is RoomViewController {
            let vc = segue.destination as? RoomViewController
            vc?.roomLabel = self.selectedRoom
        }
    }
    
    // metodo para acionar clique sobre uma biblioteca nos atalhos
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
    
        tableView.deselectRow(at: indexPath, animated: true)
        let b:String = self.sectionsToBuildings[indexPath.section]!
        let r:String = self.rowsToRooms[b]![indexPath.row]!
        self.selectedRoom = r
        self.performSegue(withIdentifier: "showRoomResult", sender: self)
    }
    
}


class ResultCell: UITableViewCell {
    @IBOutlet weak var name: UILabel!
    @IBOutlet weak var freeSpots: UILabel!
    @IBOutlet weak var light: UIView!
    
    func setRoomName(name:String) {
        self.name.text = name
    }
    
    func setFreeSpots(freeSpots:Int) {
        self.freeSpots.text = String(freeSpots)
        light.backgroundColor = UIColor.systemGreen
        if freeSpots <= 7 {
            light.backgroundColor = UIColor.systemOrange
        }
        if freeSpots <= 3 {
            light.backgroundColor = UIColor.systemRed
        }
    }
}
