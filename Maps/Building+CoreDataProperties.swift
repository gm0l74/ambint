//
//  Building+CoreDataProperties.swift
//  Maps
//
//  Created by João Saraiva on 16/05/2021.
//  Copyright © 2021 scenee. All rights reserved.
//
//

import Foundation
import CoreData


extension Building {

    @nonobjc public class func fetchRequest() -> NSFetchRequest<Building> {
        return NSFetchRequest<Building>(entityName: "Building")
    }

    @NSManaged public var name: String
    @NSManaged public var location: Int16
    @NSManaged public var occupation: NSDecimalNumber
    @NSManaged public var room: NSSet

}

// MARK: Generated accessors for room
extension Building {

    @objc(addRoomObject:)
    @NSManaged public func addToRoom(_ room: Room)

    @objc(removeRoomObject:)
    @NSManaged public func removeFromRoom(_ room: Room)

    @objc(addRoom:)
    @NSManaged public func addToRoom(_ values: NSSet)

    @objc(removeRoom:)
    @NSManaged public func removeFromRoom(_ values: NSSet)

}

extension Building : Identifiable {

}
